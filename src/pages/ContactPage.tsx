import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/store';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Enquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      showToast('Missing Fields', 'Please enter your name and message.', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast(
      'Message Received (Demo)',
      'Thank you! In this prototype, inquiries can also be routed via WhatsApp.',
      'success'
    );
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Order Enquiry',
      message: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal mt-1">
          Concierge &amp; Studio Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#736E66] mt-2">
          Whether you have questions regarding bespoke ceramics, corporate gifting, order status, or studio visits, our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#25D366]">
              <MessageCircle className="w-5 h-5 fill-current" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1918]">
                Instant WhatsApp Concierge
              </span>
            </div>
            <p className="text-xs text-[#353330] leading-relaxed">
              Our fastest response channel. Connect directly with our studio curators for real-time recommendations, stock checks, or custom orders.
            </p>
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp: {STORE_CONFIG.whatsapp.displayNumber}</span>
            </a>
          </div>

          {/* Studio Details */}
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] space-y-5 text-xs text-[#353330]">
            <h3 className="font-serif text-lg text-[#1A1918]">Studio Information</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C25E38] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1918]">Aurelia &amp; Co. Design Studio</p>
                  <p className="text-[#736E66]">
                    {STORE_CONFIG.location.studio}, {STORE_CONFIG.location.city}, {STORE_CONFIG.location.state} – {STORE_CONFIG.location.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C25E38] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1918]">Phone Concierge</p>
                  <a href={`tel:${STORE_CONFIG.phone.callingNumber}`} className="text-[#736E66] hover:underline">
                    {STORE_CONFIG.phone.displayNumber}
                  </a>
                  <p className="text-[11px] text-[#736E66] mt-0.5">{STORE_CONFIG.phone.callHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C25E38] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1918]">Email</p>
                  <a href={`mailto:${STORE_CONFIG.email}`} className="text-[#736E66] hover:underline">
                    {STORE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C25E38] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1A1918]">Studio Visiting Hours</p>
                  <p className="text-[#736E66]">Monday – Saturday: 11:00 AM – 7:00 PM IST</p>
                  <p className="text-[11px] text-[#736E66] mt-0.5">By appointment or walk-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E2D6] shadow-sm">
          <div className="border-b border-[#E7E2D6] pb-4 mb-6">
            <h2 className="font-serif text-xl text-[#1A1918]">Send a Note</h2>
            <p className="text-xs text-[#736E66] mt-0.5">
              Fill out the form below and we'll reply within 24 business hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Radhika Sen"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. radhika@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1.5">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                >
                  <option value="Order Enquiry">Order / Product Enquiry</option>
                  <option value="Custom Order">Custom Gifting / Bulk Order</option>
                  <option value="Studio Appointment">Studio Appointment</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1.5">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How may our studio assist you?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
              />
            </div>

            <Button variant="primary" size="md" type="submit" icon={<Send className="w-4 h-4" />}>
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

