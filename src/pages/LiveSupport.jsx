import React, { useState, useEffect, useRef } from 'react';
import { FaTelegramPlane, FaYoutube, FaFacebookF, FaGlobe, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import KnowledgeBaseSection from '../components/support/KnowledgeBaseSection';

const LiveSupport = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! 👋 I'm your Click Job Assistant. Ask me about deposits, withdrawals, or jobs!", sender: 'ai', time: new Date() }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [socket, setSocket] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isChatOpen]);

    // Initialize Socket
    useEffect(() => {
        const initChatSocket = async () => {
            try {
                const socketService = await import('../services/socket.js');
                const s = socketService.getSocket();
                // If socket is not already initialized/connected (maybe waiting for auth), we might need to listen to connection, 
                // but usually getSocket returns the singleton.
                // If the user isn't logged in, socket might be null or not authenticated, 
                // but the backend handler 'ai_chat' might strictly require auth if in the same connection block.
                // However, our backend implementation handled 'ai_chat' inside the authenticated block.
                // So guests might not be able to chat. We will handle that gracefully.
                setSocket(s);
            } catch (error) {
                console.error("Failed to load socket service", error);
            }
        };
        initChatSocket();
    }, [isChatOpen]);

    // Listen for incoming AI responses & History
    useEffect(() => {
        if (!socket) return;

        const handleAiResponse = (data) => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: data.message,
                sender: 'ai',
                time: data.timestamp || new Date()
            }]);
        };

        const handleAiHistory = (history) => {
            if (history && history.length > 0) {
                setMessages(history);
            }
        };

        const handleAiTyping = (data) => {
            setIsTyping(data.isTyping);
        }

        const handleError = (err) => {
            console.error("Socket error:", err);
            setIsTyping(false); // Stop typing on error
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "⚠️ Something went wrong. Please try again.",
                sender: 'ai',
                time: new Date()
            }]);
        };

        socket.on('ai_response', handleAiResponse);
        socket.on('ai_history', handleAiHistory);
        socket.on('ai_typing', handleAiTyping);
        socket.on('error', handleError);

        // Request history on load
        socket.emit('get_ai_history');

        return () => {
            socket.off('ai_response', handleAiResponse);
            socket.off('ai_history', handleAiHistory);
            socket.off('ai_typing', handleAiTyping);
            socket.off('error', handleError);
        };
    }, [socket]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMsg = { id: Date.now(), text: newMessage, sender: 'user', time: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage("");
        setIsTyping(true);

        if (socket && socket.connected) {
            socket.emit('ai_chat', { message: userMsg.text });
        } else {
            // Fallback for guest mode or disconnected state
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: "You need to be logged in to chat with our AI Assistant! 🔒",
                    sender: 'ai',
                    time: new Date()
                }]);
                setIsTyping(false);
            }, 1000);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F172A] flex flex-col items-center justify-center p-4 relative">
                <div className="w-full max-w-5xl mx-auto text-center space-y-12">

                    {/* Header Text */}
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] dark:text-white">Reach Out Anytime</h2>
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200 dark:from-[#1E293B] dark:to-[#334155] stroke-text-light dark:stroke-text-dark user-select-none" style={{ WebkitTextStroke: '2px #CBD5E1' }}>
                            Contact Us
                        </h1>
                    </div>

                    {/* Main Mail Support Card */}
                    <div className="w-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] dark:from-[#1E293B] dark:to-[#334155] rounded-3xl shadow-xl overflow-hidden relative p-10 md:p-16 flex flex-col items-center justify-center text-white dark:border dark:border-white/10">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 text-center space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-blue-100">Mail Support (24/7)</h2>
                            <p className="text-lg md:text-xl font-medium opacity-90 text-white dark:text-gray-300">admin@clickjob.com.bd</p>

                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="inline-flex items-center gap-2 bg-[#E11D48] hover:bg-[#be163b] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105 border border-white/20"
                            >
                                <FaCommentDots className="text-xl" />
                                <span>Open Live Chat</span>
                            </button>
                        </div>
                    </div>

                    {/* Social Support & Follow Us */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] dark:from-[#1E293B] dark:to-[#334155] rounded-3xl p-8 md:p-12 text-white text-left relative overflow-hidden shadow-lg dark:border dark:border-white/10">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full mix-blend-overlay filter blur-2xl translate-x-1/3 -translate-y-1/3"></div>

                            <h3 className="text-2xl font-bold mb-6 text-white dark:text-blue-100">Social Support</h3>
                            <div className="space-y-3">
                                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#FFD700] font-bold hover:underline">
                                    <span>YouTube</span>
                                </a>
                                <a href="https://t.me/clickjob" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#FFD700] font-bold hover:underline">
                                    <span>Join Telegram</span>
                                </a>
                            </div>
                        </div>

                        <div className="bg-[#1E293B] dark:bg-[#0F172A] rounded-3xl p-8 md:p-12 text-white flex flex-col items-center justify-center text-center shadow-lg border border-gray-700 dark:border-white/10">
                            <h3 className="text-xl font-bold mb-6 text-white dark:text-gray-200">Follow us on</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-lg border border-gray-500 dark:border-gray-600 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <FaGlobe className="text-xl text-gray-300 dark:text-gray-400" />
                                </a>
                                <a href="#" className="w-12 h-12 rounded-lg border border-gray-500 dark:border-gray-600 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <FaFacebookF className="text-xl text-gray-300 dark:text-gray-400" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Knowledge Base Section */}
                    <div className="pt-8 w-full text-left">
                        <KnowledgeBaseSection />
                    </div>

                </div>

                {/* Chat Modal */}
                {isChatOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white dark:bg-[#1E293B] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh] border border-gray-200 dark:border-gray-700">

                            {/* Chat Header */}
                            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white flex justify-between items-center shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                        <FaCommentDots className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none">AI Assistant</h3>
                                        <span className="text-xs text-blue-100 opacity-80 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0F172A]/50">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                            }`}>
                                            <p className="text-sm md:text-md leading-relaxed">{msg.text}</p>
                                            <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-700">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-[#0F172A] border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-[#0F172A] focus:ring-0 text-gray-800 dark:text-white transition-all outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        <FaTelegramPlane className="text-xl" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Styles */}
            <style>{`
                .stroke-text-light {
                    -webkit-text-stroke: 1px #CBD5E1;
                    color: transparent;
                }
                .dark .stroke-text-dark {
                     -webkit-text-stroke: 1px #475569;
                     color: transparent;
                }
            `}</style>
        </Layout>
    );
};

export default LiveSupport;
