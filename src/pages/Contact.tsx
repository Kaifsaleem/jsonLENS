import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { DropdownDemo } from '../components/Dropdown/DropdownDemo';

// const SERVICE_ID = 'service_5epetiz';
// const TEMPLATE_ID = 'template_3mu8a4j';
// const PUBLIC_KEY = 'PwXv-uPlCLQRhs53D';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
 
      emailjs.send(SERVICE_ID, TEMPLATE_ID, {...formData,title:"jsonLens contact form request"}, PUBLIC_KEY)
        .then((response) => {
          console.log('Email sent successfully:', response);
        })

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-light-primary dark:text-dark-primary">Contact Us</h1>
      <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-8 border border-light-border dark:border-dark-border mb-8">
        {status === 'success' ? (
          <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg text-center">
            Thank you for your message! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-primary dark:text-dark-primary mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-light-border dark:border-dark-border focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-primary dark:text-dark-primary mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-light-border dark:border-dark-border focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-primary dark:text-dark-primary mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-light-border dark:border-dark-border focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-light-accent dark:bg-dark-accent hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 text-light-background dark:text-dark-background font-medium py-2 px-4 rounded-md transition-colors disabled:bg-light-border dark:disabled:bg-dark-border disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg text-center">
                {errorMessage}
              </div>
            )}
          </form>
        )}
      </div>
      
      {/* Dropdown Component Demo */}
      <div className="bg-light-background dark:bg-dark-background shadow-lg rounded-lg p-8 border border-light-border dark:border-dark-border mb-8">
        <DropdownDemo title="Dropdown Component Demo" />
      </div>
    </div>
  );
}
