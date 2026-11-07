import React from "react";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Chatbot from "./Chatbot";

export default function FloatingActionHub() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 sm:gap-3 select-none pointer-events-none">
      {/* Floating WhatsApp Contact Button */}
      <div className="pointer-events-auto">
        <FloatingWhatsApp />
      </div>

      {/* Floating Nexus AI Chatbot */}
      <div className="pointer-events-auto">
        <Chatbot />
      </div>
    </div>
  );
}
