import React from "react";
import { X, Phone, MessageSquare, Plus, User } from "lucide-react";

interface EmergencyContactsModalProps {
  onClose: () => void;
}

export default function EmergencyContactsModal({ onClose }: EmergencyContactsModalProps) {
  const contacts = [
    { name: "Mom (Home)", relation: "Family", phone: "+1 555-0100" },
    { name: "Dr. Smith", relation: "Primary Care", phone: "+1 555-0199" },
    { name: "Local Police", relation: "Emergency", phone: "911" },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0d1424]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User size={20} className="text-blue-600" /> Emergency Contacts
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-xl">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{contact.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{contact.relation} • {contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 transition-colors">
                  <Phone size={16} />
                </button>
                <button className="p-2 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition-colors">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>
          ))}
          
          <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2">
            <Plus size={18} /> Add New Contact
          </button>
        </div>
      </div>
    </div>
  );
}
