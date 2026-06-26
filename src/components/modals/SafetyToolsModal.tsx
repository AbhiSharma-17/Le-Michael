import React from "react";
import { X, Wrench, Flashlight, Volume2, Compass, Radio } from "lucide-react";

interface SafetyToolsModalProps {
  onClose: () => void;
}

export default function SafetyToolsModal({ onClose }: SafetyToolsModalProps) {
  const tools = [
    { name: "SOS Siren", icon: Volume2, color: "bg-red-500", desc: "Loud alarm" },
    { name: "Strobe Light", icon: Flashlight, color: "bg-yellow-500", desc: "Flashing SOS" },
    { name: "Compass", icon: Compass, color: "bg-blue-500", desc: "Orientation" },
    { name: "Radio Broadcaster", icon: Radio, color: "bg-emerald-500", desc: "Offline beacon" },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0d1424]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench size={20} className="text-slate-600 dark:text-slate-400" /> Safety Tools
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-2 gap-4">
          {tools.map((tool, idx) => (
            <button key={idx} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-transform hover:scale-105 active:scale-95">
              <div className={`p-3 rounded-full text-white ${tool.color} shadow-lg shadow-black/10`}>
                <tool.icon size={24} />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-slate-900 dark:text-white">{tool.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
