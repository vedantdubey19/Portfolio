import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Bot, Cloud, Briefcase, Sparkles, Code, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import './Certifications.css';

/*
 * Every field below was transcribed from the certificate image it links to.
 * Keep it that way: the image is one click away in the lightbox, so a recruiter
 * can and will compare them. Where the issuer publishes a verification URL,
 * link it — a checkable credential is worth far more than a grand-sounding one.
 *
 * `image` is the full-resolution WebP (used in the lightbox and the high-res
 * link); `thumb` is the small WebP used by the card stack, which renders these
 * only a couple of hundred pixels wide.
 */
const certificates = [
  {
    id: 'bedrock',
    name: "Amazon Bedrock: Customization & Optimization",
    issuer: "Amazon Web Services — via Coursera",
    date: "Jun 2026",
    category: "AI & LLM Services",
    details: "AWS-authored course on customizing and optimizing foundation models in Amazon Bedrock: model tuning, inference configuration, automation, and safety guardrails.",
    icon: Bot,
    image: "/certificates/amazon-bedrock.webp",
    thumb: "/certificates/thumbs/amazon-bedrock.webp",
    verifyUrl: "https://coursera.org/verify/H0ME8BUF5OQZ",
    resting: { top: "35px", left: "10px", rotate: -18, scale: 0.92, zIndex: 1 },
    fanned: { rotate: -26, x: -160, y: -15, scale: 0.96, zIndex: 1 }
  },
  {
    id: 'gcp',
    name: "Introduction to Generative AI Studio",
    issuer: "Google Cloud course — via Simplilearn SkillUp",
    date: "Dec 2025",
    category: "Generative AI on Google Cloud",
    details: "Google Cloud course on Generative AI Studio: prompt design, model tuning, and deploying generative models on Vertex AI. Course completion — not an official Google Cloud certification.",
    icon: Cloud,
    image: "/certificates/google-cloud.webp",
    thumb: "/certificates/thumbs/google-cloud.webp",
    credentialId: "9609966",
    resting: { top: "20px", left: "45px", rotate: -9, scale: 0.94, zIndex: 2 },
    fanned: { rotate: -13, x: -80, y: -30, scale: 0.99, zIndex: 2 }
  },
  {
    id: 'ibm',
    name: "AI Virtual Internship (PBEL)",
    issuer: "IBM Developer Skills Network",
    date: "Oct 2025",
    category: "Applied AI",
    details: "Six-week project-based virtual internship in Artificial Intelligence delivered through IBM's Developer Skills Network (PBEL / FSP programme).",
    icon: Briefcase,
    image: "/certificates/ibm-internship.webp",
    thumb: "/certificates/thumbs/ibm-internship.webp",
    verifyUrl: "https://courses.ibmmooc.skillsnetwork.site/certificates/6926ba93a7f142769b67e9884835c257",
    resting: { top: "10px", left: "80px", rotate: 0, scale: 0.97, zIndex: 3 },
    fanned: { rotate: 0, x: 0, y: -40, scale: 1.03, zIndex: 3 }
  },
  {
    id: 'genai-rag',
    name: "Generative AI Applications with RAG & LangChain",
    issuer: "IBM — via Coursera",
    date: "Jun 2026",
    category: "GenAI & Agents",
    details: "IBM-authored project course building retrieval-augmented generation applications end to end: document loaders, embeddings, vector stores, and LangChain retrieval chains.",
    icon: Sparkles,
    image: "/certificates/genai-rag.webp",
    thumb: "/certificates/thumbs/genai-rag.webp",
    verifyUrl: "https://coursera.org/verify/JBGKV17BK3X5",
    resting: { top: "25px", left: "115px", rotate: 9, scale: 1.0, zIndex: 4 },
    fanned: { rotate: 13, x: 80, y: -20, scale: 1.06, zIndex: 4 }
  },
  {
    id: 'react',
    name: "Frontend Developer (React)",
    issuer: "HackerRank",
    date: "Mar 2026",
    category: "React Development",
    details: "Passed HackerRank's timed role certification test for Frontend Developer (React), covering component state, hooks, and event handling.",
    icon: Code,
    image: "/certificates/hackerrank-react.webp",
    thumb: "/certificates/thumbs/hackerrank-react.webp",
    verifyUrl: "https://www.hackerrank.com/certificates/690EB3FB15FE",
    credentialId: "690EB3FB15FE",
    resting: { top: "45px", left: "150px", rotate: 18, scale: 1.03, zIndex: 5 },
    fanned: { rotate: 26, x: 160, y: 10, scale: 1.09, zIndex: 5 }
  }
];


const Certifications = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const openCert = (cert) => {
    lastFocusedRef.current = document.activeElement;
    setActiveCert(cert);
  };

  const closeCert = useCallback(() => {
    setActiveCert(null);
    // Send focus back to the card that opened the dialog.
    if (lastFocusedRef.current instanceof HTMLElement) {
      lastFocusedRef.current.focus();
    }
  }, []);

  /*
   * Dialog behaviour: lock background scroll, move focus into the dialog,
   * close on Escape, and keep Tab cycling inside it so keyboard and
   * screen-reader users can't wander into the page behind the overlay.
   */
  useEffect(() => {
    if (!activeCert) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeCert();
        return;
      }

      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCert, closeCert]);

  return (
    <section className="certifications-section" id="certifications">
      {/* Studio Shadow & Overlay */}
      <div className="cert-shadow-overlay"></div>

      {/* Watermark Background Typography */}
      <div className="cert-watermark" aria-hidden="true">
        <span>CERTIFICATIONS</span>
      </div>

      <div className="container cert-container">
        {/* Left Column: Heading & Education */}
        <div className="cert-info-col">
          <div className="cert-subtitle-badge">
            <Award size={14} className="cert-badge-icon" />
            <span>WHAT I EARNED</span>
          </div>

          <h2 className="cert-main-heading">
            CERTIFIED EXPERTISE IN <br />
            <span className="cert-heading-highlight">AI, CLOUD & SYSTEMS.</span>
          </h2>

          <p className="cert-description">
            Industry-recognized credentials proving hands-on proficiency in building 
            production AI models, scalable GCP cloud infrastructure, and modern web applications.
          </p>

          {/* Academic Degree Card */}
          <div className="edu-card-glass">
            <div className="edu-header">
              <span className="edu-tag">ACADEMIC DEGREE</span>
              <span className="edu-years">2023 - 2027</span>
            </div>
            <h3 className="edu-degree-title">B.Tech in Data Science</h3>
            <p className="edu-inst">Lloyd Institute of Engineering & Technology</p>
            <p className="edu-summary">
              Focused track in Machine Learning, Neural Networks, Large Language Models (LLMs), 
              Retrieval-Augmented Generation (RAG), and Distributed AI Backend Infrastructure.
            </p>
          </div>
        </div>

        {/* Right Column: Himanshu 3D Fanned Card Stack */}
        <div className="services-right-col">
          <div 
            className="services-card-stack"
            onMouseEnter={() => setIsStackHovered(true)}
            onMouseLeave={() => setIsStackHovered(false)}
          >
            {certificates.map((cert) => {
              const isCardHovered = hoveredCardId === cert.id;
              const IconComp = cert.icon;

              let targetRotate = cert.resting.rotate;
              let targetX = 0;
              let targetY = 0;
              let targetScale = cert.resting.scale;
              let targetZIndex = cert.resting.zIndex;

              if (isCardHovered) {
                targetRotate = 0;
                targetX = cert.fanned.x;
                targetY = -55;
                targetScale = 1.14;
                targetZIndex = 100;
              } else if (isStackHovered) {
                targetRotate = cert.fanned.rotate;
                targetX = cert.fanned.x;
                targetY = cert.fanned.y;
                targetScale = cert.fanned.scale;
                targetZIndex = cert.fanned.zIndex;
              }

              return (
                <motion.div
                  key={cert.id}
                  className={`stack-card ${cert.id}`}
                  onMouseEnter={() => setHoveredCardId(cert.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  /* Keyboard users get the same fan-out that hovering gives */
                  onFocus={() => {
                    setIsStackHovered(true);
                    setHoveredCardId(cert.id);
                  }}
                  onBlur={() => {
                    setIsStackHovered(false);
                    setHoveredCardId(null);
                  }}
                  onClick={() => openCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openCert(cert);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`View ${cert.name} certificate from ${cert.issuer}`}
                  style={{
                    top: cert.resting.top,
                    left: cert.resting.left,
                  }}
                  animate={{
                    rotate: targetRotate,
                    x: targetX,
                    y: targetY,
                    scale: targetScale,
                    zIndex: targetZIndex
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                >
                  <div className="stack-card-inner">
                    <div className="stack-icon-box">
                      <IconComp size={18} color="#ffffff" />
                    </div>
                    <h4 className="stack-card-title">{cert.name}</h4>
                    <p className="stack-card-sub">{cert.issuer}</p>

                    <div className="stack-card-img-wrapper">
                      <img
                        src={cert.image}
                        alt=""
                        className="stack-preview-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="stack-img-overlay" aria-hidden="true">
                        <span>Click to Open 🔍</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-modal-backdrop"
            onClick={closeCert}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              aria-describedby="cert-modal-details"
            >
              <button
                type="button"
                ref={closeBtnRef}
                className="cert-modal-close"
                onClick={closeCert}
                aria-label="Close certificate details"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="cert-modal-header">
                <div className="modal-badge-row">
                  <span className="modal-category">{activeCert.category}</span>
                  <span className="modal-verified"><CheckCircle2 size={13} aria-hidden="true" /> Verified Certificate</span>
                </div>
                <h2 className="modal-title" id="cert-modal-title">{activeCert.name}</h2>
                <p className="modal-issuer">Issued by <strong>{activeCert.issuer}</strong> ({activeCert.date})</p>
              </div>

              <div className="cert-modal-image-box">
                <img
                  src={activeCert.image}
                  alt={`${activeCert.name} certificate issued by ${activeCert.issuer}`}
                  className="modal-cert-img"
                  decoding="async"
                />
              </div>

              <p className="modal-details" id="cert-modal-details">{activeCert.details}</p>

              <div className="cert-modal-footer">
                <a
                  href={activeCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-open-link"
                >
                  <span>Open High-Res Certificate</span>
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;


