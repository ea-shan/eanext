import { useState, useRef, useCallback, useEffect } from 'react';
import { FaComments, FaLink, FaChartPie, FaChartBar, FaRobot, FaQuestionCircle, FaHeadset, FaTimes, FaMicrophone } from 'react-icons/fa';
import Vapi from '@vapi-ai/web';

const solutions = [
  {
    key: 'voca',
    title: 'Voice of Customer Analytics',
    image: '/Voice-of-Customer-Analytics-2.webp',
    summary: 'Decode sentiment and trends from feedback.',
    icon: <FaComments className="w-8 h-8 text-pink-600" />,
    details: 'Our Voice of Customer Analytics helps you understand what your customers are really saying, so you can act on feedback and improve experiences.'
  },
  {
    key: 'multi',
    title: 'Multi-Touch Attribution',
    image: '/Multi-Touch-Attribution-2.webp',
    summary: 'Track every customer interaction.',
    icon: <FaLink className="w-8 h-8 text-pink-600" />,
    details: 'Multi-Touch Attribution lets you see which marketing touchpoints drive results, so you can optimize your spend and boost ROI.'
  },
  {
    key: 'clv',
    title: 'Customer Lifetime Value',
    image: '/Customer-Lifetime-Value-2-1.webp',
    summary: 'Find and keep your best customers.',
    icon: <FaChartPie className="w-8 h-8 text-pink-600" />,
    details: 'Identify your most valuable customers and predict future revenue to focus your efforts where they matter most.'
  },
  {
    key: 'mix',
    title: 'Marketing Mix Modeling',
    image: '/Marketing-Mix-Modeling-2.webp',
    summary: 'Optimize marketing performance.',
    icon: <FaChartBar className="w-8 h-8 text-pink-600" />,
    details: 'Analyze and optimize your marketing channels for maximum impact, both online and offline.'
  },
  {
    key: 'recommend',
    title: 'Recommendation Engine',
    image: '/Recommendation-Engine-2.webp',
    summary: 'Deliver personalized suggestions.',
    icon: <FaRobot className="w-8 h-8 text-pink-600" />,
    details: 'Boost conversions and engagement with AI-powered product recommendations tailored to each user.'
  },
];

const extraCard = {
  key: 'more',
  title: 'Get to know more',
  image: '',
  summary: 'Discover how our solutions can transform your business.',
  icon: <div className="flex flex-col items-center"><FaHeadset className="w-8 h-8 text-white animate-zoom-in-out" /><span className="text-xs mt-2 font-semibold text-white">Agent Support</span></div>,
  details: 'Contact us to learn how Express Analytics can help you unlock the full potential of your data with tailored analytics solutions.',
};

export default function AnalyticsSolutions() {
  const [modal, setModal] = useState(null);
  const [vapiOpen, setVapiOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [error, setError] = useState('');
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

  const handleCardClick = (card) => {
    if (card.key === 'more') {
      setVapiOpen(true);
    } else {
      setModal(card);
    }
  };
  const closeModal = () => setModal(null);
  const closeVapi = () => {
    setVapiOpen(false);
    setCallActive(false);
    setIsListening(false);
    setTranscript('');
    setError('');
  };

  // Fill grid to 6 items
  const gridItems = [...solutions, extraCard];

  return (
    <section className="py-16 bg-white text-center">
      <span className="inline-block mb-4 px-5 py-2 rounded-full bg-gray-100 text-xs font-semibold tracking-widest text-gray-700">ANALYTICS SOLUTIONS</span>
      <h3 className="text-2xl md:text-4xl font-bold mb-12 text-center">Unlock Smarter Decisions with <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-400 bg-clip-text text-transparent">Analytics Solutions</span></h3>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridItems.map((s, idx) => (
            <div
              key={s.key}
              className={
                s.key === 'more'
                  ? 'group bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl border-2 border-dashed border-gray-800 shadow-lg p-6 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[340px] text-white'
                  : 'group bg-white rounded-3xl border-2 border-dashed border-pink-200 shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[340px]'
              }
              onClick={() => handleCardClick(s)}
            >
              <div className="w-full flex justify-center mb-4">
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.title}
                    className="rounded-2xl object-cover w-full max-w-[260px] aspect-[4/3] group-hover:opacity-90 transition"
                    style={{ minHeight: '180px', maxHeight: '180px' }}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-[180px] bg-gray-800 rounded-2xl">
                    {s.icon}
                  </div>
                )}
              </div>
              <div className={`flex items-center gap-2 mb-2 ${s.key === 'more' ? 'text-white' : ''}`}>
                {s.key !== 'more' && s.icon}
                <h4 className={`text-xl font-bold ${s.key === 'more' ? 'text-white' : 'text-pink-700'} text-left`}>{s.title}</h4>
              </div>
              <div className={`text-md text-center ${s.key === 'more' ? 'text-gray-200' : 'text-gray-600'}`}>{s.summary}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for solution details */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative text-left">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-4">
              {modal.icon}
              <h4 className="text-2xl font-bold text-pink-700">{modal.title}</h4>
            </div>
            <div className="mb-2 text-gray-700 text-lg">{modal.summary}</div>
            <div className="mb-6 text-gray-500">{modal.details}</div>
            <button className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition">
              Learn More
            </button>
          </div>
        </div>
      )}
      {/* Vapi Voice Support Modal */}
      {vapiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative text-left">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={closeVapi}
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <FaHeadset className="text-pink-600 text-2xl" />
              <span className="font-bold text-lg text-gray-900">Express Analytics Voice Support</span>
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
          </div>
        </div>
      )}
    </section>
  );
}
