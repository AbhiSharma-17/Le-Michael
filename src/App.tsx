import { useState, useEffect, useRef } from "react";
import DisasterResponseAgent from "./agents/DisasterResponseAgent";
import RoadAccidentAgent from "./agents/RoadAccidentAgent";
import ViolenceResponseAgent from "./agents/ViolenceResponseAgent";
import GeneralEmergencyAgent from "./agents/GeneralEmergencyAgent";
import EmergencyDetectionAgent from "./agents/EmergencyDetectionAgent";
import HealthEmergencyAgent from "./agents/HealthEmergencyAgent";
import KidnapMissingPersonAgent from "./agents/KidnapMissingPersonAgent";
import DomesticViolenceAgent from "./agents/DomesticViolenceAgent";
import ScamProtectionAgent from "./agents/ScamProtectionAgent";
import WomensSafetyAgent from "./agents/WomensSafetyAgent";
import SearchRescueAgent from "./agents/SearchRescueAgent";
import VoiceConversationAgent from "./agents/VoiceConversationAgent";
import LocationNavigationAgent from "./agents/LocationNavigationAgent";
import MentalHealthAgent from "./agents/MentalHealthAgent";
import OfflineGuide from "./components/OfflineGuide";
import AgentDirectory from "./components/AgentDirectory";
import {
  LayoutDashboard, Mic, MapPin, ShieldAlert, Users, Bell, History, Wrench, BookOpen, Settings, HelpCircle,
  PhoneCall, ArrowRight, ShieldCheck, HeartPulse, Search, Home, UserRoundCheck, Radar, Shield, CarFront,
  Crosshair, MapPinned, MessageSquare, Camera, HeartHandshake, Route, LifeBuoy, Phone,
  CheckCircle2, AlertTriangle, X, Moon, Sun
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet icon issue in React
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function App() {
  const [activeAgent, setActiveAgent] = useState<
    | "none"
    | "disaster"
    | "road"
    | "violence"
    | "general"
    | "detection"
    | "health"
    | "kidnap"
    | "domestic"
    | "scam"
    | "womens"
    | "rescue"
    | "offline"
    | "voice"
    | "location"
    | "mental_health"
    | "directory"
  >("none");
  
  const [locationName, setLocationName] = useState<string | null>(null);
  const [locationCoords, setLocationCoords] = useState<[number, number] | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showSettings, setShowSettings] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationCoords([latitude, longitude]);
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (response.ok) {
              const data = await response.json();
              if (data.display_name) {
                const parts = data.display_name.split(",");
                setLocationName(parts.length > 2 ? `${parts[0]}, ${parts[1]}` : data.display_name);
                return;
              }
            }
          } catch (e) {
            console.error("Reverse geocoding failed", e);
          }
          setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        () => setLocationName("Location unavailable")
      );
    }
  }, []);

  const handleShareLocation = () => {
    if (navigator.share && locationCoords) {
      navigator.share({
        title: 'Emergency: My Location',
        text: `I need help. My current location is ${locationName || 'unknown'}. Coordinates: ${locationCoords[0]}, ${locationCoords[1]}.`,
        url: `https://maps.google.com/?q=${locationCoords[0]},${locationCoords[1]}`
      }).catch(console.error);
    } else {
      alert("Location sharing is not supported on this browser or location is not yet acquired.");
    }
  };

  const handleTakePhoto = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  if (activeAgent === "disaster") return <DisasterResponseAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "road") return <RoadAccidentAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "violence") return <ViolenceResponseAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "general") return <GeneralEmergencyAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "detection") return <EmergencyDetectionAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "health") return <HealthEmergencyAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "kidnap") return <KidnapMissingPersonAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "domestic") return <DomesticViolenceAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "scam") return <ScamProtectionAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "womens") return <WomensSafetyAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "rescue") return <SearchRescueAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "voice") return <VoiceConversationAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "location") return <LocationNavigationAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "mental_health") return <MentalHealthAgent onBack={() => setActiveAgent("none")} />;
  if (activeAgent === "directory") return <AgentDirectory onBack={() => setActiveAgent("none")} onSelectAgent={(id) => setActiveAgent(id)} />;
  if (activeAgent === "offline") return <OfflineGuide onBack={() => setActiveAgent("none")} />;

  const mapCenter: [number, number] = locationCoords || [23.0225, 72.5714]; // Default to Ahmedabad if location not available

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} h-dvh w-full`}>
      <div className="flex h-full w-full bg-slate-50 dark:bg-[#0a0f1c] text-slate-800 dark:text-slate-300 font-sans overflow-hidden transition-colors duration-200">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-[#0d1424] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto hide-scrollbar z-20 transition-colors duration-200">
          <div className="p-5 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
            <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-900/20">
              <ShieldAlert size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">Emergency AI</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Dispatch System</p>
            </div>
          </div>

          <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
            <NavItem icon={<Mic size={18} />} label="Voice Assistant" onClick={() => setActiveAgent("voice")} />
            <NavItem icon={<MapPin size={18} />} label="Live Location" onClick={() => setActiveAgent("location")} />
            <NavItem icon={<Shield size={18} />} label="My Safety" onClick={() => setActiveAgent("womens")} />
            <NavItem icon={<Users size={18} />} label="Emergency Contacts" />
            <NavItem icon={<Bell size={18} />} label="Alerts & Notifications" badge="3" />
            <NavItem icon={<History size={18} />} label="Incident History" />
            <NavItem icon={<Wrench size={18} />} label="Safety Tools" />
            <NavItem icon={<BookOpen size={18} />} label="Offline Survival Guide" onClick={() => setActiveAgent("offline")} />
            
            <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
              <NavItem icon={<Settings size={18} />} label="Settings" onClick={() => setShowSettings(true)} />
              <NavItem icon={<HelpCircle size={18} />} label="Help & Support" />
            </div>
          </nav>

          <div className="p-4">
            <button className="w-full bg-red-50 dark:bg-red-600/10 hover:bg-red-600 dark:hover:bg-red-600 border border-red-200 dark:border-red-600/30 text-red-600 dark:text-red-500 hover:text-white dark:hover:text-white rounded-xl py-3 px-4 flex items-center gap-3 font-semibold transition-all group shadow-sm">
              <PhoneCall size={20} className="group-hover:animate-pulse" />
              <span>Quick SOS</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col min-w-0 z-10">
          
          {/* TOP HEADER */}
          <header className="h-16 flex items-center justify-between px-6 bg-white/80 dark:bg-[#0d1424]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-200">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">Dashboard</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">System Online</span>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <CheckCircle2 size={12} /> 24/7 Active
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden md:block">
                {currentTime.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
              
              <a href="tel:911" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full font-bold shadow-lg shadow-red-600/20 dark:shadow-red-900/20 transition-transform hover:scale-105 active:scale-95">
                <Phone size={16} />
                SOS Call
              </a>

              <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Abhi Sharma</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Premium User</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-2 border-indigo-200 dark:border-indigo-400 shadow-sm">
                  AS
                </div>
              </div>
            </div>
          </header>

          {/* SCROLLABLE DASHBOARD */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard icon={<AlertTriangle className="text-red-600 dark:text-red-500" />} title="Active Emergencies" value="3" subtitle="View all →" color="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20" />
              <KpiCard icon={<ShieldCheck className="text-blue-600 dark:text-blue-500" />} title="Agents Ready" value="16/16" subtitle="All systems operational" color="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20" />
              <KpiCard icon={<MapPinned className="text-emerald-600 dark:text-emerald-500" />} title="Your Location" value={locationName || "Locating..."} subtitle="Accuracy: High" color="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" />
              <KpiCard icon={<History className="text-purple-600 dark:text-purple-500" />} title="Avg. Response Time" value="4.2 min" subtitle="Across all services" color="bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20" />
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* AGENTS SECTION (Col Span 4) */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col shadow-sm transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Emergency AI Agents</h3>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">16/16 Active</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <AgentBtn icon={<HeartPulse size={20}/>} label="Health" color="text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-500/10" onClick={() => setActiveAgent("health")}/>
                  <AgentBtn icon={<ShieldAlert size={20}/>} label="Disaster" color="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" onClick={() => setActiveAgent("disaster")}/>
                  <AgentBtn icon={<Crosshair size={20}/>} label="Crime" color="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10" onClick={() => setActiveAgent("violence")}/>
                  
                  <AgentBtn icon={<Search size={20}/>} label="Kidnap" color="text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10" onClick={() => setActiveAgent("kidnap")}/>
                  <AgentBtn icon={<Home size={20}/>} label="Domestic" color="text-pink-600 dark:text-pink-500 bg-pink-50 dark:bg-pink-500/10" onClick={() => setActiveAgent("domestic")}/>
                  <AgentBtn icon={<ShieldCheck size={20}/>} label="Scam" color="text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" onClick={() => setActiveAgent("scam")}/>
                  
                  <AgentBtn icon={<UserRoundCheck size={20}/>} label="Women's" color="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-400/10" onClick={() => setActiveAgent("womens")}/>
                  <AgentBtn icon={<Radar size={20}/>} label="Search" color="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10" onClick={() => setActiveAgent("rescue")}/>
                  <AgentBtn icon={<CarFront size={20}/>} label="Road" color="text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-600/10" onClick={() => setActiveAgent("road")}/>
                </div>
                
                <button 
                  onClick={() => setActiveAgent("directory")}
                  className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  View All Agents <ArrowRight size={16} />
                </button>
              </div>

              {/* LIVE LOCATION (Col Span 5) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-sm transition-colors duration-200">
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-bold text-slate-900 dark:text-white">Live Location</h3>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded text-xs font-bold border border-red-200 dark:border-red-500/20 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-500 animate-pulse" /> Live
                  </div>
                </div>
                
                <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden min-h-[250px] shadow-inner">
                  {/* Leaflet Map Integration */}
                  <div className="absolute inset-0 z-0">
                    <MapContainer center={mapCenter} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                        url={theme === 'dark' 
                          ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        }
                      />
                      {locationCoords && (
                        <Marker position={locationCoords}>
                          <Popup>
                            Your current location.<br/>{locationName}
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>

                  {/* Map Overlays */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                     <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-w-[200px] pointer-events-auto">
                       <p className="text-slate-900 dark:text-white text-sm font-bold truncate">{locationName || "Locating..."}</p>
                       <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">GPS Accuracy: High</p>
                     </div>
                     <button onClick={handleShareLocation} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2.5 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors pointer-events-auto">
                        <MapPin size={16} /> Share
                     </button>
                  </div>
                </div>
              </div>

              {/* CRITICAL ALERTS (Col Span 3) */}
              <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
                
                <div className="bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex-1 shadow-sm transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Critical Alerts</h3>
                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">View All</button>
                  </div>
                  
                  <div className="space-y-3">
                    <AlertItem type="red" title="Fire Reported" desc="Navrangpura, Ahmedabad" time="2 min ago" icon={<AlertTriangle size={16}/>} />
                    <AlertItem type="orange" title="Heavy Rain Alert" desc="Ahmedabad, Gujarat" time="15 min ago" icon={<Route size={16}/>} />
                    <AlertItem type="yellow" title="Traffic Jam" desc="SG Highway" time="25 min ago" icon={<CarFront size={16}/>} />
                  </div>
                </div>

              </div>

            </div>

            {/* BOTTOM ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              
              {/* RECENT INCIDENTS (Col Span 4) */}
              <div className="lg:col-span-4 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Recent Incidents</h3>
                  <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">View All</button>
                </div>
                <div className="space-y-2.5">
                  <IncidentItem icon={<CarFront size={18}/>} color="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" title="Road Accident" desc="SG Highway, Ahmedabad" tag="High" tagColor="text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30" time="10 min ago" />
                  <IncidentItem icon={<HeartPulse size={18}/>} color="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10" title="Medical Emergency" desc="Vastrapur, Ahmedabad" tag="Critical" tagColor="text-red-800 dark:text-red-500 border-red-300 dark:border-red-500/50 bg-red-100 dark:bg-red-500/10" time="22 min ago" />
                  <IncidentItem icon={<Shield size={18}/>} color="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" title="Crime Report" desc="Paldi, Ahmedabad" tag="Medium" tagColor="text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30" time="1 hr ago" />
                </div>
              </div>

              {/* QUICK ACTIONS (Col Span 5) */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-colors duration-200">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 h-[calc(100%-2rem)]">
                   <ActionBtn icon={<LifeBuoy size={24}/>} label="Call Ambulance" color="text-red-600 dark:text-red-500" bg="bg-red-50 dark:bg-red-500/10" onClick={() => setActiveAgent('health')} />
                   <ActionBtn icon={<Shield size={24}/>} label="Call Police" color="text-blue-600 dark:text-blue-500" bg="bg-blue-50 dark:bg-blue-500/10" onClick={() => setActiveAgent('violence')} />
                   <ActionBtn icon={<AlertTriangle size={24}/>} label="Call Fire Dept." color="text-orange-600 dark:text-orange-500" bg="bg-orange-50 dark:bg-orange-500/10" onClick={() => setActiveAgent('disaster')} />
                   <ActionBtn icon={<MapPin size={24}/>} label="Share Location" color="text-emerald-600 dark:text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-500/10" onClick={handleShareLocation} />
                   <ActionBtn icon={<Mic size={24}/>} label="Record Audio" color="text-purple-600 dark:text-purple-500" bg="bg-purple-50 dark:bg-purple-500/10" onClick={() => setActiveAgent('voice')} />
                   <ActionBtn icon={<Camera size={24}/>} label="Take Photo" color="text-sky-600 dark:text-sky-500" bg="bg-sky-50 dark:bg-sky-500/10" onClick={handleTakePhoto} />
                </div>
                {/* Hidden input for camera access */}
                <input type="file" id="cameraInput" ref={cameraInputRef} accept="image/*" capture="environment" className="hidden" />
              </div>

              {/* EMERGENCY CONTACTS / TIPS (Col Span 3) */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm h-full transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white">Emergency Contacts</h3>
                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Manage</button>
                  </div>
                  <div className="space-y-3">
                    <ContactItem name="Papa" phone="+91 98765 43210" color="bg-emerald-600" initials="P" />
                    <ContactItem name="Mumma" phone="+91 98765 43211" color="bg-purple-600" initials="M" />
                    <ContactItem name="Brother" phone="+91 98765 43212" color="bg-blue-600" initials="B" />
                  </div>
                  <button className="w-full mt-4 py-2 border border-slate-300 dark:border-slate-700 border-dashed rounded-lg text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-slate-700 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500 transition-colors bg-slate-50 dark:bg-slate-800/30">
                    + Add New Contact
                  </button>
                </div>
              </div>
              
            </div>
          </div>

          {/* BOTTOM STATUS BAR */}
          <footer className="bg-white dark:bg-[#0d1424] border-t border-slate-200 dark:border-slate-800 p-3 px-6 flex items-center justify-between shrink-0 transition-colors duration-200">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400">
               <CheckCircle2 size={16} className="text-emerald-500" />
               System Status: All Systems Operational
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm border-r border-slate-200 dark:border-slate-700 pr-6 hidden md:flex">
                  <Phone size={16} className="text-red-500 dark:text-red-400" />
                  Emergency Hotline: <span className="text-slate-900 dark:text-white font-black tracking-wider">112</span>
               </div>
               
               <div className="flex items-center gap-4">
                 <span className="text-sm font-bold text-slate-500 dark:text-slate-400 hidden sm:block">Need help? Chat with Guardian AI</span>
                 <button onClick={() => setActiveAgent("detection")} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 dark:shadow-red-900/20 transition-transform hover:scale-105 active:scale-95">
                   <MessageSquare size={16} fill="currentColor" className="text-white/20" />
                   Chat Now
                 </button>
               </div>
            </div>
          </footer>

        </main>
      </div>

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0d1424] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transition-colors duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings size={20} className="text-indigo-500" /> Settings
              </h2>
              <button onClick={() => setShowSettings(false)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider opacity-80">Appearance</h3>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="text-indigo-400" /> : <Sun className="text-amber-500" />}
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Theme Mode</p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Toggle light or dark theme</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="relative inline-flex h-7 w-12 items-center rounded-full bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  >
                    <span
                      className={`${theme === 'dark' ? 'translate-x-6 bg-slate-900' : 'translate-x-1 bg-white'} inline-block h-5 w-5 transform rounded-full transition-transform`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider opacity-80">Account</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Manage Profile
                  </button>
                  <button className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponents for cleaner code

function NavItem({ icon, label, active, badge, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors font-bold ${active ? "bg-red-50 dark:bg-red-600/10 text-red-600 dark:text-red-500" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function KpiCard({ icon, title, value, subtitle, color }: any) {
  return (
    <div className={`bg-white dark:bg-[#0d1424] border ${color} rounded-2xl p-4 flex items-center gap-4 shadow-sm transition-colors duration-200`}>
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-0.5 tracking-wide">{title}</h4>
        <div className="text-xl font-black text-slate-900 dark:text-white mb-0.5">{value}</div>
        <p className="text-[10px] text-slate-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}

function AgentBtn({ icon, label, color, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-center group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
    </button>
  );
}

function ActionBtn({ icon, label, color, bg, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center py-4 px-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-colors group text-center h-full">
      <div className={`${color} mb-2 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 leading-tight">{label}</span>
    </button>
  );
}

function AlertItem({ type, title, desc, time, icon }: any) {
  const colors = {
    red: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500",
    orange: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-500",
    yellow: "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-500",
  }[type as "red"|"orange"|"yellow"];

  return (
    <div className={`p-3 rounded-xl border ${colors} flex gap-3 shadow-sm transition-colors duration-200`}>
      <div className="shrink-0 mt-0.5 bg-current/10 p-1.5 rounded-lg">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-black text-slate-900 dark:text-slate-200 truncate pr-2">{title}</h4>
          <span className="text-[10px] font-bold opacity-70 whitespace-nowrap">{time}</span>
        </div>
        <p className="text-xs font-medium opacity-80 truncate">{desc}</p>
      </div>
    </div>
  );
}

function IncidentItem({ icon, color, title, desc, tag, tagColor, time }: any) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors cursor-pointer">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black text-slate-900 dark:text-slate-200 truncate">{title}</h4>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate">{desc}</p>
      </div>
      <div className="text-right shrink-0">
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${tagColor} bg-white dark:bg-slate-900/50`}>
          {tag}
        </span>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function ContactItem({ name, phone, color, initials }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
          {initials}
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 dark:text-slate-200">{name}</h4>
          <p className="text-xs font-bold text-slate-500">{phone}</p>
        </div>
      </div>
      <div className="flex gap-1.5">
        <button className="p-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 hover:bg-emerald-100 dark:hover:bg-emerald-400/20 rounded-lg transition-colors">
          <Phone size={14} />
        </button>
        <button className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 hover:bg-blue-100 dark:hover:bg-blue-400/20 rounded-lg transition-colors">
          <MessageSquare size={14} />
        </button>
      </div>
    </div>
  );
}
