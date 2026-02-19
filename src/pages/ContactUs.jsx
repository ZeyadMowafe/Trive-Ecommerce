import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../services/api';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactAPI.submit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert('Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container-custom">
        <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </motion.div>
        
        <div className="contact-content">
          <motion.form onSubmit={handleSubmit} className="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Subject *</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required></textarea>
            </div>
            
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitted && (
              <motion.p className="success-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Message sent successfully! We'll get back to you soon.
              </motion.p>
            )}
          </motion.form>
          
          <motion.div className="contact-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="info-item">
              <h3>Visit Us</h3>
              <p>ALmahalah  Al-Kubra ,<br/>Mahalat Abu Ali</p>
            </div>
            <div className="info-item">
              <h3>Call Us</h3>
              <p>+20 10 04012242</p>
            </div>
            <div className="info-item">
              <h3>Email Us</h3>
              <p>TriveStore@gmail.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;


