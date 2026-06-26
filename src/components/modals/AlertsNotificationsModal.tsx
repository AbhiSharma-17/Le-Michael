import React from "react";
import { X, Bell, AlertTriangle, ShieldCheck, CloudLightning } from "lucide-react";

interface AlertsNotificationsModalProps {
  onClose: () => void;
}

export default function AlertsNotificationsModal({ onClose }: AlertsNotificationsModalProps) {
  const alerts = [
    { type: "warning", title: "Severe Weather Alert", desc: "Heavy rainfall expected in your area over the next 4 hours.", time: "10 min ago", icon: CloudLightning, color: "text-amber-500 bg-amber-50 dark:bg-amber-500/10" },
    { type: "critical", title: "Road Closure", desc: "Main st closed due to accident. Re-routing advised.", time: "1 hour ago", icon: AlertTriangle, color: "text-red-500 bg-red-50 dark:bg-red-500/10" },
    { type: "success", title: "System Update", desc: "Emergency AI modules updated to v2.4 successfully.", time: "2 days ago", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0d1424]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell size={20} className="text-amber-500" /> Alerts & Notifications
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl relative">
              {idx === 0 && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500"></div>}
              <div className={`p-2 rounded-lg h-fit ${alert.color}`}>
                <alert.icon size={20} />
              </div>
              <div className="pr-4">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{alert.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{alert.desc}</p>
                <p className="text-[10px] font-medium text-slate-400 mt-2">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
