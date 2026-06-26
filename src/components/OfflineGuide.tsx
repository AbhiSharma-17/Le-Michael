import {
  BookOpen,
  AlertTriangle,
  Droplets,
  Flame,
  Wind,
  HeartPulse,
} from "lucide-react";
import { useState } from "react";

export default function OfflineGuide({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<
    "firstaid" | "earthquake" | "fire" | "flood" | "storm"
  >("firstaid");

  return (
    <div className="flex flex-col h-dvh bg-gray-50 font-sans">
      <header className="flex items-center gap-3 bg-gray-900 text-white p-4 shadow-md shrink-0">
        <button
          onClick={onBack}
          className="mr-2 hover:bg-gray-800 p-2 rounded-full transition-colors"
        >
          &larr; Back
        </button>
        <BookOpen size={24} />
        <div>
          <h1 className="text-lg font-bold tracking-wide leading-tight">
            Offline Survival Guide
          </h1>
          <p className="text-xs text-gray-400 font-medium">
            Critical Instructions Available Without Internet
          </p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 max-w-[250px] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("firstaid")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === "firstaid" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <HeartPulse size={20} />
              <span className="font-semibold">Basic First Aid</span>
            </button>
            <button
              onClick={() => setActiveTab("earthquake")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === "earthquake" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <AlertTriangle size={20} />
              <span className="font-semibold">Earthquake</span>
            </button>
            <button
              onClick={() => setActiveTab("fire")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === "fire" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <Flame size={20} />
              <span className="font-semibold">Fire</span>
            </button>
            <button
              onClick={() => setActiveTab("flood")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === "flood" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <Droplets size={20} />
              <span className="font-semibold">Flood</span>
            </button>
            <button
              onClick={() => setActiveTab("storm")}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeTab === "storm" ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-700"}`}
            >
              <Wind size={20} />
              <span className="font-semibold">Severe Storm</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          {activeTab === "firstaid" && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Basic First Aid
              </h2>

              <div className="space-y-4 text-gray-800">
                <h3 className="text-xl font-bold text-red-600">
                  CPR (Cardiopulmonary Resuscitation)
                </h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Check the scene for safety, then check the person.</li>
                  <li>Call 911 or your local emergency number.</li>
                  <li>
                    Place the heel of one hand on the center of the chest.
                  </li>
                  <li>Place the other hand on top and interlock fingers.</li>
                  <li>
                    Push hard and fast (at least 2 inches deep, 100-120
                    compressions per minute).
                  </li>
                  <li>
                    Allow chest to return to normal position after each push.
                  </li>
                </ol>

                <h3 className="text-xl font-bold text-red-600 mt-6">
                  Bleeding
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Apply direct pressure with a clean cloth or sterile
                    dressing.
                  </li>
                  <li>Maintain pressure until bleeding stops.</li>
                  <li>
                    If blood soaks through, add more layers. Do NOT remove the
                    first layer.
                  </li>
                  <li>
                    If bleeding is severe and on a limb, consider a tourniquet
                    applied 2-3 inches above the wound.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-red-600 mt-6">
                  Choking (Heimlich Maneuver)
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Stand behind the person and wrap your arms around their
                    waist.
                  </li>
                  <li>
                    Make a fist with one hand and place it just above their
                    navel.
                  </li>
                  <li>Grasp the fist with your other hand.</li>
                  <li>
                    Perform quick, upward thrusts until the object is expelled.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "earthquake" && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Earthquake Survival
              </h2>

              <div className="space-y-4 text-gray-800">
                <h3 className="text-xl font-bold text-orange-600">
                  During the Earthquake
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>DROP</strong> to your hands and knees.
                  </li>
                  <li>
                    <strong>COVER</strong> your head and neck with your arms.
                    Crawl under a sturdy table or desk if nearby.
                  </li>
                  <li>
                    <strong>HOLD ON</strong> to your shelter until the shaking
                    stops.
                  </li>
                  <li>
                    If inside: Stay inside. Do NOT run outside. Stay away from
                    windows.
                  </li>
                  <li>
                    If outside: Move away from buildings, streetlights, and
                    utility wires.
                  </li>
                  <li>
                    If in a vehicle: Stop quickly and safely. Stay in the
                    vehicle.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-orange-600 mt-6">
                  After the Shaking
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Expect aftershocks.</li>
                  <li>Check yourself for injuries.</li>
                  <li>
                    If you are in a damaged building, go outside and quickly
                    move away from it.
                  </li>
                  <li>
                    If you are trapped: Do not light a match. Do not kick up
                    dust. Tap on a pipe or wall so rescuers can locate you.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "fire" && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Fire Emergency
              </h2>

              <div className="space-y-4 text-gray-800">
                <h3 className="text-xl font-bold text-orange-600">
                  If a Fire Starts
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Get out, stay out, and call 911.</li>
                  <li>Yell "Fire!" several times and go outside right away.</li>
                  <li>
                    If closed doors or handles are warm, use your second way
                    out. Never open doors that are warm to the touch.
                  </li>
                  <li>
                    If you must escape through smoke, get low and go under the
                    smoke to your exit.
                  </li>
                  <li>
                    If your clothes catch fire:{" "}
                    <strong>STOP, DROP, and ROLL</strong>.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-orange-600 mt-6">
                  If You Cannot Escape
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Close the door to the room you are in.</li>
                  <li>
                    Cover vents and cracks around the door with cloth or tape to
                    keep smoke out.
                  </li>
                  <li>
                    Call 911 or the fire department. Tell them where you are.
                  </li>
                  <li>
                    Signal for help at the window with a light-colored cloth or
                    a flashlight.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "flood" && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Flood Survival
              </h2>

              <div className="space-y-4 text-gray-800">
                <h3 className="text-xl font-bold text-blue-600">
                  Immediate Actions
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Move to higher ground immediately.</li>
                  <li>
                    Do not walk, swim, or drive through floodwaters.{" "}
                    <strong>Turn Around, Don't Drown!</strong>
                  </li>
                  <li>
                    Just 6 inches of moving water can knock you down, and 1 foot
                    of moving water can sweep your vehicle away.
                  </li>
                  <li>Stay off bridges over fast-moving water.</li>
                </ul>

                <h3 className="text-xl font-bold text-blue-600 mt-6">
                  If Trapped
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    If trapped in a building, go to its highest level. Do not
                    climb into a closed attic (you may become trapped by rising
                    water).
                  </li>
                  <li>Go on the roof only if necessary.</li>
                  <li>Signal for help.</li>
                  <li>
                    If your vehicle is trapped in rapidly moving water, stay
                    inside. If water is rising inside the vehicle, seek refuge
                    on the roof.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "storm" && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b pb-4">
                Severe Storms & Tornadoes
              </h2>

              <div className="space-y-4 text-gray-800">
                <h3 className="text-xl font-bold text-purple-600">
                  During a Tornado
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Go to a safe room, basement, or storm cellar.</li>
                  <li>
                    If there is no basement, go to a small, interior, windowless
                    room on the lowest level (e.g., a bathroom or closet).
                  </li>
                  <li>
                    Protect your head and neck with your arms, and cover
                    yourself with a heavy coat or blanket.
                  </li>
                  <li>
                    Do not stay in a mobile home. Seek shelter in a sturdy
                    building.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-purple-600 mt-6">
                  During a Thunderstorm / Lightning
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>When thunder roars, go indoors!</li>
                  <li>Avoid using corded phones and electrical equipment.</li>
                  <li>
                    Avoid plumbing (do not wash hands, take a shower, or wash
                    dishes).
                  </li>
                  <li>Stay away from windows and doors.</li>
                  <li>
                    If outside and no shelter is available: crouch low, with as
                    little of your body touching the ground as possible. Never
                    shelter under an isolated tree.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
