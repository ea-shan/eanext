import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import { FaMicrophone, FaTimes, FaRobot, FaChevronUp } from 'react-icons/fa';
import { useCallback, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export default function Footer() {
  const [show, setShow] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check localStorage for cookie acceptance
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('cookieAccepted');
      if (accepted === 'true') {
        setCookieAccepted(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!cookieAccepted && typeof window !== 'undefined') {
      setTimeout(() => setCookieOpen(true), 1000);
    }
  }, [cookieAccepted]);

  // Move to Top Button always visible (responsive)
  useEffect(() => {
    setShow(true);
  }, []);

  // Vapi AI Chat Headless UI
  const [chatOpen, setChatOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [callActive, setCallActive] = useState(false);
  const vapiApiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  const vapiAssistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const vapiRef = useRef();

  // Minimal Vapi Next.js Example Integration
  useEffect(() => {
    if (!vapiRef.current && vapiApiKey) {
      vapiRef.current = new Vapi({ apiKey: vapiApiKey });
    }
  }, [vapiApiKey]);

  const handleStartCall = useCallback(() => {
    setError('');
    setTranscript('');
    setCallActive(true);
    setIsListening(true);
    if (vapiRef.current && vapiAssistantId) {
      vapiRef.current.start({ assistant: vapiAssistantId });
      vapiRef.current.on('transcript', (data) => {
        setTranscript((prev) => prev + (prev ? '\n' : '') + data.transcript);
      });
      vapiRef.current.on('error', (err) => {
        setError('Voice AI error: ' + (err?.message || 'Unknown error'));
        setCallActive(false);
        setIsListening(false);
      });
      vapiRef.current.on('end', () => {
        setCallActive(false);
        setIsListening(false);
      });
    } else {
      setError('Vapi not initialized or Assistant ID missing.');
      setCallActive(false);
      setIsListening(false);
    }
  }, [vapiAssistantId]);

  const handleEndCall = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setCallActive(false);
    setIsListening(false);
    setTranscript('');
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptAll = () => {
    setCookiePrefs({ necessary: true, analytics: true, marketing: true });
    setCookieAccepted(true);
    setCookieOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieAccepted', 'true');
    }
  };
  const handleAcceptSelected = () => {
    setCookieAccepted(true);
    setCookieOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieAccepted', 'true');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4 mt-16 rounded-t-3xl shadow-lg font-sans relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center mb-2">
            <Image src="/ea-main.webp" alt="Express Analytics Logo" width={48} height={48} className="w-12 h-12 object-contain mr-2" />
            <span className="font-semibold text-lg" style={{ color: 'white' }}>express <span style={{ color: 'white' }}>analytics</span></span>
          </div>
          <div className="text-sm text-gray-400 mb-4">AI-Powered Smarter Marketing</div>
        </div>
        {/* Navigation */}
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="text-sm text-gray-400 space-y-1">
            <li><Link href="/about-us" className="hover:text-pink-400 transition">About Us</Link></li>
            <li><Link href="/leadership" className="hover:text-pink-400 transition">Leadership</Link></li>
            <li><Link href="/our-partners" className="hover:text-pink-400 transition">Our Partners</Link></li>
            <li><Link href="/careers" className="hover:text-pink-400 transition">Careers</Link></li>
            <li><Link href="/contact-us" className="hover:text-pink-400 transition">Contact Us</Link></li>
            <li><Link href="/write-for-us" className="hover:text-pink-400 transition">Write for Us</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Services</div>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Customer Analytics</li>
            <li>Marketing Analytics</li>
            <li>Business Intelligence</li>
            <li>Data Cleaning</li>
            <li>Data Visualization</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <div className="font-semibold mb-2">Subscribe to our Newsletter</div>
          <form className="flex flex-col space-y-2">
            <input type="text" placeholder="First name" className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400" />
            <input type="email" placeholder="Email" className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400" />
            <label className="flex items-center text-xs text-gray-400">
              <input type="checkbox" className="mr-2" /> I accept the privacy policy
            </label>
            <button type="submit" className="mt-2 px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white font-semibold">Subscribe</button>
          </form>
          <div className="mt-4 text-xs text-gray-400">
            �� Call +1 (618) 224 3573<br />
            Email: info@expressanalytics.net
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500 flex flex-col items-center gap-2">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          <a href="/sitemap.xml" className="hover:text-pink-400 transition">Sitemap</a>
          <a href="/terms" className="hover:text-pink-400 transition">Terms and Conditions</a>
          <a href="/privacy" className="hover:text-pink-400 transition">Privacy Policy</a>
        </div>
        <span>© 2025 Express Analytics, All Rights Reserved</span>
      </div>
      {/* Move to Top Button - always visible, responsive */}
      <button
        onClick={scrollToTop}
        className="fixed z-50 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all flex items-center justify-center
          bottom-4 right-4 md:bottom-8 md:right-8
          left-1/2 md:left-auto transform md:translate-x-0 -translate-x-1/2 md:translate-x-0"
        aria-label="Move to top"
        style={{ boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)' }}
      >
        <FaChevronUp className="text-2xl" />
      </button>

      {/* Vapi AI Chat Headless UI */}
      {/* <button
        onClick={() => setChatOpen(true)}
        className="fixed z-50 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all flex items-center justify-center
          bottom-24 right-4 md:bottom-32 md:right-8"
        aria-label="Open AI Chat"
        style={{ boxShadow: '0 4px 24px 0 rgba(155,81,224,0.10)' }}
      >
        <FaRobot className="text-2xl" />
      </button> */}
      <Dialog open={chatOpen} onClose={() => setChatOpen(false)} className="fixed inset-0 z-[999] flex items-end md:items-center justify-center">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" onClick={() => setChatOpen(false)} />
        <Dialog.Panel className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto mb-8 animate-fadeInUp flex flex-col gap-4">
          <button onClick={() => setChatOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-pink-600"><FaTimes size={20} /></button>
          <div className="flex items-center gap-2 mb-2">
            <FaRobot className="text-pink-600 text-2xl" />
            <span className="font-bold text-lg text-gray-900">Express Analytics AI Assistant</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={callActive ? handleEndCall : handleStartCall}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition
                ${callActive ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600'}`}
              disabled={isListening && !callActive}
            >
              <FaMicrophone /> {callActive ? 'End Call' : 'Start Voice Call'}
            </button>
            <div className="mt-2 p-3 bg-gray-100 rounded-lg min-h-[60px] text-gray-800 text-sm font-mono whitespace-pre-wrap">
              {error ? (
                <span className="text-red-600">{error}</span>
              ) : callActive ? (transcript || 'Listening...') : 'Click "Start Voice Call" to begin.'}
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">Real-time transcript will appear here.</div>
        </Dialog.Panel>
      </Dialog>
      {/* Cookie Notification */}
      {!cookieAccepted && (
        <Dialog open={cookieOpen} onClose={() => setCookieOpen(false)} className="fixed inset-0 z-[999] pointer-events-none">
          <div className="fixed inset-0 bg-transparent" aria-hidden="true" />
          <Dialog.Panel className="pointer-events-auto fixed left-4 bottom-4 w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4 animate-fadeInUp border border-gray-200">
            <Dialog.Title className="text-lg font-bold text-gray-900 mb-2">We use cookies</Dialog.Title>
            <Dialog.Description className="text-gray-700 mb-2">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. Manage your preferences below.
            </Dialog.Description>
            <div className="flex flex-col gap-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cookiePrefs.necessary} disabled className="accent-pink-600" /> Necessary (always active)
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cookiePrefs.analytics} onChange={e => setCookiePrefs(p => ({ ...p, analytics: e.target.checked }))} className="accent-pink-600" /> Analytics Cookies
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={cookiePrefs.marketing} onChange={e => setCookiePrefs(p => ({ ...p, marketing: e.target.checked }))} className="accent-pink-600" /> Marketing Cookies
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-2">
              <button onClick={handleAcceptAll} className="flex-1 px-4 py-2 rounded bg-gradient-main text-white font-semibold shadow hover:scale-105 transition">Accept All</button>
              <button onClick={handleAcceptSelected} className="flex-1 px-4 py-2 rounded border border-pink-600 text-pink-600 font-semibold shadow hover:bg-pink-50 transition">Accept Selected</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </footer>
  );
}
