import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ArrowUpRight,
  Bot,
  User,
  Zap,
  Copy,
  Check,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import ChatFormattedReply from "./ChatFormattedReply";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedActions?: string[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello! I am **Nexus AI** — your digital growth advisor at OneNexus Studio.\n\nAsk me about our **High-Converting Websites, AI Workflows, Branding, Monthly Social Reels**, or how our **Dedicated Monthly Growth Retainers** work.",
    timestamp: "Just now",
    suggestedActions: [
      "What services do you offer?",
      "How do monthly retainers work?",
      "How much does a website cost?",
      "Chat with a founder on WhatsApp",
    ],
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyMessage = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Isolate chat scrolling from parent page & Lenis smooth scroll
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent wheel event from bubbling to window / Lenis
      e.stopPropagation();
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  // Open chatbot
  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  // Close chatbot
  const handleClose = () => {
    setIsOpen(false);
  };

  // Reset chat history
  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    // Direct WhatsApp intent routing
    if (text.toLowerCase().includes("whatsapp")) {
      const waUrl = getWhatsAppUrl();
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyPayload }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          "I am here to help. You can also connect directly with our senior leadership on WhatsApp for an immediate audit.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I experienced a slight connection delay. You can connect directly with our senior partners on WhatsApp for an immediate response.",
        timestamp: "Now",
        suggestedActions: ["Chat on WhatsApp", "View Services"],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format bold and linebreaks in response text
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      // Parse markdown bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lIdx} className="block leading-relaxed min-h-[1.2em]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-[#111827]">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Open Nexus AI Chatbot"
          className="group relative w-13 h-13 sm:w-14 sm:h-14 bg-[#111827] hover:bg-[#2554E8] text-white rounded-none border border-black/15 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Notification Unread Beacon */}
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full bg-[#2554E8] opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-[#2554E8] border border-white" />
            </span>
          )}

          <div className="relative">
            <MessageSquare size={22} className="transition-transform group-hover:scale-110" />
            <Sparkles size={11} className="absolute -top-1.5 -right-1.5 text-[#2554E8] group-hover:text-white" />
          </div>

          {/* Hover Tooltip */}
          <span className="absolute right-full mr-3 whitespace-nowrap bg-[#111827] text-white px-3 py-1.5 border border-white/10 shadow-xl font-mono text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-none hidden sm:block">
            Ask Nexus AI
          </span>
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div
          id="nexus-chatbot-window"
          data-lenis-prevent="true"
          className="fixed bottom-6 right-6 z-50 w-[94vw] sm:w-[460px] max-w-[480px] h-[600px] max-h-[84vh] bg-white border border-black/15 shadow-2xl rounded-none flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 overscroll-contain"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#111827] text-white border-b border-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#2554E8] text-white flex items-center justify-center rounded-none shadow-xs">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                    NEXUS AI
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#2554E8]/40 border border-[#2554E8]/60 text-[9px] font-mono font-bold text-white uppercase rounded-none">
                    v1.0
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                  <span>ONLINE • DIGITAL ADVISOR</span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Restart Conversation"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors rounded-none"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={handleClose}
                title="Minimize Chat"
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors rounded-none"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Direct WhatsApp Callout Banner inside Chat */}
          <div className="px-3.5 py-2 bg-emerald-50 border-b border-emerald-200/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-emerald-900 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-none" />
              DIRECT FOUNDER CHANNEL
            </span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2554E8] font-black uppercase hover:underline flex items-center gap-0.5"
            >
              <span>WHATSAPP ↗</span>
            </a>
          </div>

          {/* Messages Feed */}
          <div
            ref={messagesContainerRef}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F6] scrollbar-thin overscroll-contain"
            style={{ overscrollBehavior: "contain", touchAction: "pan-y" }}
          >
            {messages.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-neutral-400">
                    {isUser ? (
                      <>
                        <span>YOU</span>
                        <User size={10} />
                      </>
                    ) : (
                      <>
                        <Bot size={10} className="text-[#2554E8]" />
                        <span className="text-[#2554E8] font-bold">NEXUS AI</span>
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  {/* Message Bubble Container */}
                  {isUser ? (
                    <div className="p-3 text-xs font-sans max-w-[85%] rounded-none shadow-xs bg-[#2554E8] text-white">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="w-full max-w-[96%] sm:max-w-[94%] bg-white border border-black/15 shadow-sm rounded-none overflow-hidden">
                      {/* Executive Reply Box Header Bar */}
                      <div className="px-3.5 py-1.5 bg-[#111827] text-white border-b border-black/15 flex items-center justify-between font-mono text-[9px]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
                          <span className="font-bold tracking-wider text-white">NEXUS AI ADVISOR</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.content, msg.id)}
                            className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer px-1.5 py-0.5 hover:bg-white/10 rounded-none"
                            title="Copy reply text"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check size={10} className="text-emerald-400" />
                                <span className="text-emerald-400 font-bold">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy size={10} />
                                <span>COPY</span>
                              </>
                            )}
                          </button>
                          <span className="text-neutral-500">•</span>
                          <span className="text-neutral-400">{msg.timestamp}</span>
                        </div>
                      </div>

                      {/* Custom Formatted Reply Body (Headings, Tables, Point Cards, Callouts) */}
                      <div className="p-3.5 sm:p-4 bg-white">
                        <ChatFormattedReply content={msg.content} />
                      </div>
                    </div>
                  )}

                  {/* Suggested Quick Action Chips on Assistant Messages */}
                  {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 bg-white hover:bg-[#2554E8] hover:text-white border border-black/10 rounded-none font-mono text-[10px] font-bold text-neutral-700 transition-colors text-left"
                        >
                          <span>{action}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <span className="font-mono text-[10px] text-[#2554E8] font-bold">
                  NEXUS AI IS ANALYZING...
                </span>
                <div className="p-3 bg-white border border-black/10 rounded-none flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#2554E8] rounded-none animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#2554E8] rounded-none animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#2554E8] rounded-none animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-black/15 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about websites, branding, AI, retainers..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 bg-neutral-50 border border-black/10 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] focus:bg-white transition-colors rounded-none"
            />

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 bg-[#2554E8] hover:bg-[#1a42be] disabled:opacity-40 disabled:hover:bg-[#2554E8] text-white flex items-center justify-center transition-colors rounded-none shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
