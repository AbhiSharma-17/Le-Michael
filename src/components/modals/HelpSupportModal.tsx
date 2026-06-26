import React from "react";
import { X, HelpCircle, Mail, MessageCircle, FileText } from "lucide-react";

interface HelpSupportModalProps {
  onClose: () => void;
}

export default function HelpSupportModal({ onClose }: HelpSupportModalProps) {
  const faqs = [
    { q: "How do I trigger an SOS?", a: "Press the large Quick SOS button in the bottom left of the sidebar." },
    { q: "Are the AI agents really 24/7?", a: "Yes, our automated agents are available globally 24/7." },
    { q: "Is my location shared automatically?", a: "Only if you explicitly click the Share Location button inside an active emergency." },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0d1424]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle size={20} className="text-indigo-500" /> Help & Support
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-300">
              <MessageCircle size={16} /> Live Chat
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Mail size={16} /> Email Us
            </button>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText size={16} className="text-slate-400" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                  <p className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{faq.q}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
