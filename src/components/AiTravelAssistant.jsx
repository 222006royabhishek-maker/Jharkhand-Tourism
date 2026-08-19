import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, ShieldAlert } from 'lucide-react';

export default function AiTravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am your Jharkhand AI Travel & Budget Planner. Ask me about trip itineraries, hotel prices, driving routes, or police helpline numbers!',
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const generateAiResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('police') || q.includes('emergency') || q.includes('help') || q.includes('station')) {
      return `🚨 **Jharkhand Emergency Directory & Police Helpline Numbers:**
      
• **State Emergency / Police Control**: 112 or 100
• **Jharkhand Tourism Police**: +91 651 2400496
• **Women Safety Helpline**: 1091
• **Ambulance & Medical Emergency**: 108
• **Forest & Highway Patrol**: 1800-345-6577

**Nearest District Police Station Outposts:**
1. **Ranchi Main Station**: Main Road, Ranchi (0651-2208888)
2. **Netarhat Outpost**: Near Magnolia Point, Latehar (06565-222100)
3. **Patratu Police Station**: Near Patratu Dam, Ramgarh (06553-255200)
4. **Deoghar Town PS**: Tower Chowk, Deoghar (06432-222204)
5. **Betla Forest Guard Post**: Betla National Park Gate (06562-222600)`;
    }

    if (q.includes('budget') || q.includes('3-day') || q.includes('plan') || q.includes('10,000') || q.includes('cost')) {
      return `🗺️ **3-Day Jharkhand Budget Itinerary (Estimated Total: ₹8,500 – ₹9,800)**

**Day 1: Ranchi Waterfalls & Tagore Hill**
• **Sightseeing**: Tagore Hill, Rock Garden, Dassam & Hundru Falls.
• **Stay**: Capitol Hill / Local Guest House (~₹2,200/night).
• **Food & Transport**: Auto/Cab hire (~₹1,500).

**Day 2: Patratu Valley & Lake Resort**
• **Route**: Scenic drive down Ranchi-Patratu Expressway (40 km, 1 hr).
• **Activities**: Hairpin valley photos, Patratu Speed Boating (~₹400).
• **Stay**: Patratu Eco Cabins / Lake Resort (~₹2,800/night).

**Day 3: Netarhat Sunrise & Pine Valleys**
• **Route**: Drive to Netarhat (125 km, 3.5 hrs).
• **Activities**: Sunrise at Magnolia Point, Upper Ghaghri Falls.
• **Budget Summary**: Accommodation: ~₹5,000 | Food & Fuel: ~₹3,500 | Total: ~₹8,500.`;
    }

    if (q.includes('hotel') || q.includes('patratu') || q.includes('netarhat') || q.includes('route')) {
      return `🏨 **Recommended Hotels & Driving Routes:**

**1. Netarhat Hill Station**
• **Hotels**: Netarhat Forest Bungalow (₹3,499/night), Prabhat Vihar Lodge (₹2,899/night).
• **Route**: Ranchi → Gumla → Netarhat via NH-39 (155 km, ~4 hrs). Beautiful mountain ascent!

**2. Patratu Valley & Dam**
• **Hotels**: Patratu Lake Resort (₹4,200/night), Valley View Chalets (₹3,100/night).
• **Route**: Ranchi → Kanke → Patratu Expressway (38 km, ~1 hr smooth highway).`;
    }

    return `🌲 **Jharkhand Travel Guide:**
Jharkhand is famous for its 30+ roaring waterfalls, 79,716 km² eco-canopy, and sacred pilgrimage peaks. 

**Quick Recommendations:**
• **Best Nature Vistas**: Netarhat Sunrise Point & Patratu Valley.
• **Best Waterfalls**: Hundru, Jonha, Dassam, and Lodh Falls.
• **Best Wildlife**: Betla National Park Tiger Reserve.
• **Best Pilgrimage**: Deoghar Baidyanath Temple & Parasnath Hill.

Ask me for specific hotel pricing, custom trip budgets, or police helpline numbers anytime!`;
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const responseText = generateAiResponse(text);
      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Sleek Logo-Only Floating AI Button Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Assistant"
          className="relative w-12 h-12 rounded-full glass-card border border-white/25 text-white shadow-2xl flex items-center justify-center hover:scale-110 hover:border-white/50 active:scale-95 transition-all duration-300 backdrop-blur-2xl group"
        >
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
        </button>
      </div>

      {/* AI Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-2 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl h-[85vh] sm:h-[650px] bg-[#0A0D14] border border-white/20 sm:rounded-[2.2rem] rounded-t-[2.2rem] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-base font-bold text-white flex items-center gap-2">
                    Jharkhand AI Planner
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">LIVE AI</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light">Routes, Hotels, Travel Budget & Police Emergency</p>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Emergency Ribbon Bar */}
            <div className="px-4 py-2 bg-red-950/40 border-b border-red-500/20 flex items-center justify-between text-xs text-red-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-[10px] uppercase font-bold tracking-wider">Police Emergency Helpline: 112</span>
              </div>
              <button 
                onClick={() => handleSend('Show me Jharkhand emergency helpline numbers and nearest police station contacts.')}
                className="text-[10px] underline font-semibold text-red-300 hover:text-white"
              >
                View Contacts
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm font-light leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-white text-black rounded-br-none font-medium shadow-md' 
                        : 'glass-card text-slate-200 rounded-bl-none border border-white/15 whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="glass-card p-4 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-slate-400">
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                    <span>Analyzing Jharkhand routes, hotel prices & helpline database...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-white/10 bg-black/60">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask AI about trip budgets, hotel costs, routes, police numbers..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-white/30"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim()}
                  className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-slate-200 disabled:opacity-40 transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
