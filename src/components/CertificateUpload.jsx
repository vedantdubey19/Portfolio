import React, { useState } from 'react';
import './CertificateUpload.css';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

const CertificateUpload = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: ''
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'Image must be less than 5MB' });
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setStatus({ type: '', message: '' });
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl('');
    // Clear input
    document.getElementById('cert-image-input').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer || !formData.date || !image) {
      setStatus({ type: 'error', message: 'Please fill all fields and select an image' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('issuer', formData.issuer);
    submitData.append('date', formData.date);
    submitData.append('image', image);

    try {
      const response = await fetch('http://localhost:5001/api/certificates', {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Certificate uploaded successfully!' });
        // Reset form
        setFormData({ title: '', issuer: '', date: '' });
        removeImage();
        if (onUploadSuccess) {
          onUploadSuccess(data.certificate);
        }
      } else {
        setStatus({ type: 'error', message: data.error || 'Upload failed' });
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setStatus({ type: 'error', message: 'Connection error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="certificate-upload-section" id="certificate-upload">
      <div className="container">
        <h2 className="section-title">
          <Upload className="section-icon" /> Upload Certificate
        </h2>
        
        <div className="upload-container glass-panel magnetic">
          <form className="upload-form" onSubmit={handleSubmit}>
            
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Certificate Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. AWS Certified Solutions Architect"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="issuer">Issuer</label>
                <input
                  type="text"
                  id="issuer"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="e.g. Amazon Web Services"
                  required
                />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="date">Date Issued</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g. Jan 2024"
                  required
                />
              </div>
            </div>

            <div className="form-group image-upload-group">
              <label>Certificate Image</label>
              
              {!previewUrl ? (
                <div className="image-drop-zone">
                  <input
                    type="file"
                    id="cert-image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input-hidden"
                  />
                  <label htmlFor="cert-image-input" className="file-input-label">
                    <Upload size={32} className="upload-icon" />
                    <span>Click to browse or drag and drop</span>
                    <span className="file-hint">JPG, PNG or WEBP (Max 5MB)</span>
                  </label>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={previewUrl} alt="Certificate Preview" className="image-preview" />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Uploading...' : 'Upload Certificate'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CertificateUpload;
