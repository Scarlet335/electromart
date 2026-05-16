'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/AppIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, send to your API or email
    const message = `New contact message from ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/2376XXXXXXXX?text=${encodeURIComponent(message)}`;
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Optionally open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    { icon: 'EnvelopeIcon', label: 'Email', value: 'contact@electromart.cm', href: 'mailto:contact@electromart.cm' },
    { icon: 'PhoneIcon', label: 'Phone', value: '+237 677 123 456', href: 'tel:+237677123456' },
    { icon: 'ChatBubbleLeftEllipsisIcon', label: 'WhatsApp', value: '+237 677 123 456', href: 'https://wa.me/237677123456' },
    { icon: 'MapPinIcon', label: 'Address', value: 'Douala, Cameroon', href: 'https://maps.google.com' }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <Icon name="ChevronRightIcon" size={12} />
            <span className="text-foreground">Contact Us</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-section-xl text-foreground mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.label === 'Address' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="card-border rounded-2xl p-5 flex items-center gap-4 hover:border-primary transition-colors group"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition">
                    <Icon name={info.icon as any} size={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-600 text-foreground">{info.value}</p>
                  </div>
                </a>
              ))}

              {/* Business Hours */}
              <div className="card-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center">
                    <Icon name="ClockIcon" size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="text-foreground">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: 'FacebookIcon', name: 'Facebook', href: '#' },
                    { icon: 'InstagramIcon', name: 'Instagram', href: '#' },
                    { icon: 'TwitterIcon', name: 'Twitter', href: '#' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-primary transition"
                    >
                      <Icon name={social.icon as any} size={18} className="text-muted-foreground hover:text-primary" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-border rounded-2xl p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Send us a Message</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="bg-success/15 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckBadgeIcon" size={32} className="text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours via WhatsApp.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary px-6 py-2 rounded-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-600 text-foreground mb-2">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                          placeholder="Jean-Pierre Mbarga"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-600 text-foreground mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                          placeholder="jean@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-600 text-foreground mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground"
                          placeholder="+237 677 123 456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-600 text-foreground mb-2">Subject *</label>
                        <select
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground"
                        >
                          <option value="">Select a subject</option>
                          <option value="Product Inquiry">Product Inquiry</option>
                          <option value="Order Status">Order Status</option>
                          <option value="Return/Exchange">Return/Exchange</option>
                          <option value="Wholesale">Wholesale/B2B</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-600 text-foreground mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-input text-foreground placeholder:text-muted-foreground resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 rounded-lg font-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy. We'll respond via WhatsApp or email.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="card-border rounded-2xl overflow-hidden">
              <div className="h-64 bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31860.482656858393!2d9.700766!3d4.051056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106112f3f5c2b6a5%3A0x8c2f5c8c5c5c5c5!2sDouala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ElectroMart Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  📍 We are based in Douala, with delivery available nationwide across Cameroon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}