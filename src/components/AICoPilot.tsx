/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageCircle, X, Send, Bot, GraduationCap, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'How to study in Canada from Nigeria?',
  'UK Student Visa requirements & health surcharge',
  'Fully funded scholarships for Nigerians',
  'How much proof of funds do I need?'
];

export default function AICoPilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: "👋 Hello! I am your Gattigo AI Counselor. Ask me about study destinations, admission deadlines, visa requirements, or local document evaluation (like WAEC). How can I guide your international dreams today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prompt constructed with local contextual injection
      const fullHistory = messages.map(m => `${m.sender}: ${m.text}`).join('\n') + `\nuser: ${textToSend}`;

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: fullHistory,
          prompt: textToSend
        })
      });

      if (!res.ok) {
        throw new Error('Counseling server response error');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || "I apologize, but I struggled to connect to our scheduling system. Please use our booking form or click the WhatsApp advisor button below for immediate human support!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I am having temporary problems connecting to my database. Don't worry! You can book a free human consultation using our forms on the page, or chat directly via WhatsApp.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating CTA Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <motion.button
          id="gtg-co-pilot-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F38B0E] text-white shadow-xl hover:bg-[#d87600] focus:outline-none focus:ring-4 focus:ring-orange-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          
          {/* Pulsing indicator */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-600 border border-white text-[8px] text-white font-bold items-center justify-center">AI</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Slide-out Sidebar Chatbox Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="gtg-co-pilot-panel"
            className="fixed right-6 bottom-24 z-50 flex h-[580px] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 sm:w-[420px]"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="bg-[#063970] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F38B0E]">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                      Gattigo AI Assistant
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-blue-100">Study Abroad Admissions Expert</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="rounded-lg p-1 text-blue-200 hover:bg-blue-800 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Body & Scroll Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
              <div className="rounded-xl bg-orange-50 border border-orange-100 p-3 text-xs text-[#063970] flex items-start gap-2.5 shadow-sm">
                <Sparkles className="h-4 w-4 text-[#F38B0E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Interactive Co-Pilot:</span> Use me to find affordable universities, test requirements, scholarship criteria, or checklist instructions.
                </div>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${msg.sender === 'user' ? 'bg-[#F38B0E] text-white' : 'bg-blue-100 text-[#063970]'}`}>
                      {msg.sender === 'user' ? 'You' : <GraduationCap className="h-3.5 w-3.5" />}
                    </div>
                    <div className="space-y-1">
                      <div className={`rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-[#063970] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                        {msg.text.split('\n').map((paragraph, index) => (
                          <p key={index} className={index > 0 ? "mt-1.5" : ""}>{paragraph}</p>
                        ))}
                      </div>
                      <span className="block text-[9px] text-gray-400 text-right px-1">{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center text-xs text-gray-500 bg-white border border-gray-100 rounded-full py-1.5 px-3 shadow-sm">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F38B0E] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F38B0E]"></span>
                    </span>
                    <span>AI counselor is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Presets and Controls */}
            {messages.length === 1 && (
              <div className="bg-slate-50 border-t border-gray-100 p-3">
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2 px-1">Common Questions</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRESET_PROMPTS.map((promptText, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(promptText)}
                      className="flex items-center justify-between text-left rounded-lg bg-white border border-gray-200 px-3 py-2 text-xs text-[#063970] hover:border-[#F38B0E] hover:bg-orange-50/40 transition font-medium"
                    >
                      <span>{promptText}</span>
                      <ChevronRight className="h-3 w-3 text-[#F38B0E]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="border-t border-gray-100 bg-white p-3 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about admissions, visas, fees..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#063970] focus:ring-1 focus:ring-[#063970] focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#063970] text-white hover:bg-[#042850] disabled:bg-gray-100 disabled:text-gray-400 transition shrink-0"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
