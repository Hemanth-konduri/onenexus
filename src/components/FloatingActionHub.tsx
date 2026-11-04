import React from "react";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Chatbot from "./Chatbot";

export default function FloatingActionHub() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 sm:gap-3 select-none">
      {/* Floating WhatsApp Contact Button */}
      <FloatingWhatsApp />

      {/* Floating Nexus AI Chatbot */}
      <Chatbot />
    </div>
  );
}
