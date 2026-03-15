require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const path = require('path');
const multer = require('multer');
const fs = require('fs');

const Certificate = require('./models/Certificate');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads/certificates');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes

// Get all certificates
app.get('/api/certificates', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Server error fetching certificates' });
  }
});

// Upload new certificate
app.post('/api/certificates', upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, date } = req.body;
    
    if (!title || !issuer || !date || !req.file) {
      return res.status(400).json({ error: 'Please enter all fields and upload an image' });
    }

    const imageUrl = `/uploads/certificates/${req.file.filename}`;

    const newCertificate = new Certificate({
      title,
      issuer,
      date,
      imageUrl
    });

    await newCertificate.save();
    
    res.status(201).json({ success: true, certificate: newCertificate, message: 'Certificate uploaded successfully!' });
  } catch (error) {
    console.error('Certificate Upload Error:', error);
    res.status(500).json({ error: 'Server error saving certificate' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();
    
    res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ error: 'Server error saving message' });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
