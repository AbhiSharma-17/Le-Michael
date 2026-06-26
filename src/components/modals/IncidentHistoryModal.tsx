import React from "react";
import { X, History, MapPin, Clock } from "lucide-react";

interface IncidentHistoryModalProps {
  onClose: () => void;
}

export default function IncidentHistoryModal({ onClose }: IncidentHistoryModalProps) {
  const history = [
    { date: "Oct 12, 2026", type: "Health Emergency", agent: "Health AI", duration: "12 mins", status: "Resolved" },
    { date: "Aug 04, 2026", type: "Disaster Alert", agent: "Disaster AI", duration: "3 mins", status: "Auto-cleared" },
    { date: "Jan 19, 2026", type: "Route Navigation", agent: "Location AI", duration: "45 mins", status: "Reached Safezone" },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0d1424]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History size={20} className="text-purple-500" /> Incident History
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-6">
            {history.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-[#0a0f1c]"></div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-100 dark:border-slate-700/50 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{item.type}</p>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">{item.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                    <Clock size={12} /> {item.date} • {item.duration}
                  </p>
                  <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 w-fit px-2 py-1 rounded">
                    Agent: {item.agent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
