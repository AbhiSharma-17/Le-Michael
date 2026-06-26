import {
  ArrowLeft,
  Mic,
  MapPinned,
  HeartHandshake,
  Route,
  HeartPulse,
  Search,
  ShieldAlert,
  Crosshair,
  LifeBuoy,
  CarFront,
  Home,
  ShieldCheck,
  UserRoundCheck,
  Radar,
  BookOpen,
  Info,
} from "lucide-react";

const agents = [
  {
    id: "voice",
    name: "Voice & Conversation",
    icon: Mic,
    color: "text-purple-600 bg-purple-50",
    description:
      "Initial emergency contact. I am here to listen, calm you down, and collect information.",
    priority: "High - Use for hands-free or panicked situations",
  },
  {
    id: "location",
    name: "Location & Navigation",
    icon: MapPinned,
    color: "text-sky-600 bg-sky-50",
    description:
      "Find your location, emergency resources, and safe routes during emergencies.",
    priority: "Critical - When lost, trapped, or seeking shelter",
  },
  {
    id: "mental_health",
    name: "Mental Health & Crisis",
    icon: HeartHandshake,
    color: "text-teal-600 bg-teal-50",
    description:
      "Immediate emotional support, psychological first aid, and crisis de-escalation.",
    priority: "High - For panic attacks, distress, or suicidal ideation",
  },
  {
    id: "detection",
    name: "Emergency Detection",
    icon: Route,
    color: "text-zinc-800 bg-zinc-100",
    description:
      "Not sure which one? I will classify the emergency and recommend the right agent.",
    priority: "Medium - When situation is ambiguous",
  },
  {
    id: "health",
    name: "Health Emergency",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50",
    description:
      "Immediate medical guidance and first-aid instructions for medical emergencies.",
    priority: "Critical - For life-threatening injuries or medical events",
  },
  {
    id: "disaster",
    name: "Disaster Response",
    icon: ShieldAlert,
    color: "text-red-600 bg-red-50",
    description:
      "Assistance for natural and man-made disasters (e.g., Earthquakes, Fires, Gas Leaks, Floods).",
    priority: "Critical - During large-scale catastrophes",
  },
  {
    id: "road",
    name: "Road Accident",
    icon: CarFront,
    color: "text-blue-600 bg-blue-50",
    description:
      "Immediate first-aid and safety guidance for vehicular accidents and collisions.",
    priority: "High - Following any traffic collision",
  },
  {
    id: "violence",
    name: "Crime Intelligence",
    icon: Crosshair,
    color: "text-purple-600 bg-purple-50",
    description:
      "Assess threats, recommend safe actions, and support victims of crime.",
    priority: "Critical - During active shooter or violent crimes",
  },
  {
    id: "kidnap",
    name: "Kidnap & Missing",
    icon: Search,
    color: "text-amber-600 bg-amber-50",
    description:
      "Assistance during suspected kidnappings and missing-person emergencies.",
    priority: "Critical - Time-sensitive tracking and reporting",
  },
  {
    id: "domestic",
    name: "Domestic Violence",
    icon: Home,
    color: "text-pink-600 bg-pink-50",
    description:
      "Support and safety planning for domestic violence situations.",
    priority: "High - Requires discretion and immediate safety planning",
  },
  {
    id: "womens",
    name: "Women's Safety",
    icon: UserRoundCheck,
    color: "text-rose-600 bg-rose-50",
    description:
      "Immediate safety guidance and support during unsafe situations.",
    priority: "High - Personal safety threats and stalking",
  },
  {
    id: "rescue",
    name: "Search & Rescue",
    icon: Radar,
    color: "text-amber-600 bg-amber-50",
    description:
      "Assistance for people trapped, stranded, or missing during emergencies.",
    priority: "Critical - When isolated in dangerous environments",
  },
  {
    id: "scam",
    name: "Scam Protection",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50",
    description:
      "Identify scams, secure your accounts, and protect your identity.",
    priority: "Medium - Financial and identity threats",
  },
  {
    id: "general",
    name: "General Emergency",
    icon: LifeBuoy,
    color: "text-teal-600 bg-teal-50",
    description:
      "Assistance for other emergencies (e.g., Poisoning, Animal Attacks, Electrical).",
    priority: "Medium - For all other situations",
  },
  {
    id: "offline",
    name: "Offline Survival Guide",
    icon: BookOpen,
    color: "text-gray-900 bg-gray-100",
    description:
      "Access critical first-aid and emergency instructions even without internet.",
    priority: "Medium - Reference material when disconnected",
  },
];

export default function AgentDirectory({
  onBack,
  onSelectAgent,
}: {
  onBack: () => void;
  onSelectAgent: (id: any) => void;
}) {
  return (
    <div className="flex flex-col h-dvh bg-gray-50 font-sans overflow-hidden">
      <header className="flex items-center gap-3 bg-slate-800 text-white p-4 shadow-md shrink-0">
        <button
          onClick={onBack}
          className="mr-2 hover:bg-slate-700 p-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <Info size={24} />
        <div>
          <h1 className="text-lg font-bold tracking-wide leading-tight">
            Agent Directory
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Quick reference & safety priorities
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-sm text-gray-500 mb-6 px-2">
            Review the list below to understand which specialized AI agent is
            best suited for your current situation. Click on any agent to
            activate it immediately.
          </p>

          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:border-slate-300 hover:shadow-md cursor-pointer transition-all"
            >
              <div
                className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center ${agent.color}`}
              >
                <agent.icon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {agent.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {agent.description}
                </p>
                <div className="inline-flex items-center text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                  Priority: {agent.priority}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
