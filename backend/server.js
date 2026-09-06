require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');

const Message = require('./models/Message');
const Certificate = require('./models/Certificate');

const app = express();
const PORT = process.env.PORT || 5001;

// ---------------------------------------------------------------------------
// Required configuration. Fail at boot rather than at the first request.
// ---------------------------------------------------------------------------
const { MONGO_URI, ADMIN_TOKEN } = process.env;

if (!MONGO_URI) {
  console.error('FATAL: MONGO_URI is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

if (!ADMIN_TOKEN || ADMIN_TOKEN.length < 32) {
  console.error(
    'FATAL: ADMIN_TOKEN must be set to a random string of at least 32 characters.\n' +
    'Generate one with:  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.disable('x-powered-by');

// Only the origins you actually serve the site from may call this API.
// Set ALLOWED_ORIGINS as a comma-separated list, e.g.
//   ALLOWED_ORIGINS=https://vedantdubey.com,http://localhost:5173
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin / server-to-server requests send no Origin header.
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    methods: ['GET', 'POST'],
  })
);

// Cap the JSON body — the contact form only ever sends a few hundred bytes.
app.use(express.json({ limit: '10kb' }));

/**
 * Minimal fixed-window rate limiter, kept dependency-free on purpose.
 * Good enough for a personal portfolio behind a single process. If this ever
 * runs on more than one instance, swap in express-rate-limit with a shared
 * store, since this counter lives in memory.
 */
const createRateLimiter = ({ windowMs, max, message }) => {
  const hits = new Map();

  // Drop expired buckets so the map cannot grow without bound.
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > max) {
      res.set('Retry-After', Math.ceil((entry.resetAt - now) / 1000));
      return res.status(429).json({ error: message });
    }

    return next();
  };
};

const contactLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many messages sent. Please try again in a little while.',
});

const uploadLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many upload attempts. Please try again later.',
});

/**
 * Bearer-token gate for write endpoints. Compared in constant time so the
 * token cannot be recovered by timing the response.
 */
const requireAdmin = (req, res, next) => {
  const header = req.get('authorization') || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';

  const a = Buffer.from(provided);
  const b = Buffer.from(ADMIN_TOKEN);

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return next();
};

// ---------------------------------------------------------------------------
// File uploads
// ---------------------------------------------------------------------------
const uploadDir = path.join(__dirname, 'uploads/certificates');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const ALLOWED_MIME = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    // Never trust the client filename — derive the extension from the accepted
    // mime type so a ".php"/".html" name can't be written to a served folder.
    const ext = ALLOWED_MIME.get(file.mimetype) || '.bin';
    const unique = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(req, file, cb) {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, or WebP images are allowed'));
    }
    return cb(null, true);
  },
});

// Uploaded files are user-supplied, so serve them as inert downloads rather
// than letting the browser sniff and execute anything.
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    dotfiles: 'deny',
    index: false,
    setHeaders(res) {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('Content-Security-Policy', "default-src 'none'; img-src 'self'");
    },
  })
);

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, maxLength) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Server error fetching certificates' });
  }
});

app.post(
  '/api/certificates',
  uploadLimiter,
  requireAdmin,
  upload.single('image'),
  async (req, res) => {
    const title = clean(req.body.title, 120);
    const issuer = clean(req.body.issuer, 120);
    const date = clean(req.body.date, 40);

    const removeUpload = () => {
      if (req.file) fs.unlink(req.file.path, () => {});
    };

    if (!title || !issuer || !date || !req.file) {
      removeUpload();
      return res.status(400).json({ error: 'Title, issuer, date and an image are all required' });
    }

    try {
      const newCertificate = await Certificate.create({
        title,
        issuer,
        date,
        imageUrl: `/uploads/certificates/${req.file.filename}`,
      });

      return res.status(201).json({
        success: true,
        certificate: newCertificate,
        message: 'Certificate uploaded successfully!',
      });
    } catch (error) {
      // Don't leave an orphaned file on disk if the DB write fails.
      removeUpload();
      console.error('Certificate Upload Error:', error);
      return res.status(500).json({ error: 'Server error saving certificate' });
    }
  }
);

app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 200);
  const message = clean(req.body.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are all required' });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'Please write a slightly longer message' });
  }

  try {
    await Message.create({ name, email, message });
    return res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ error: 'Server error saving message' });
  }
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return res.status(status).json({ error: err.message });
  }

  if (err && /not allowed by CORS/.test(err.message)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  console.error('Unhandled error:', err);
  return res.status(500).json({ error: 'Server error' });
});

// ---------------------------------------------------------------------------
// Boot — only listen once the database is actually reachable.
// ---------------------------------------------------------------------------
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error('FATAL: MongoDB connection failed:', err.message);
    process.exit(1);
  });
