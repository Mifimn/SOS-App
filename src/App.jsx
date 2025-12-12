import { useState, useEffect } from 'react';
import SetupScreen from './SetupScreen';
import PanicButton from './PanicButton';
import InfoHub from './InfoHub'; 
import { useGeoLocation } from './hooks/useGeoLocation';

// YOUR BACKEND URL
const BACKEND_URL = "/api/send-sos";

function PanicDashboard({ userData, onReset, onOpenInfo }) {
  const location = useGeoLocation();
  const [safeLoading, setSafeLoading] = useState(false);

  // HELPER: Get Battery Level
  const getBatteryStatus = async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        return `${Math.round(battery.level * 100)}%`;
      } catch (e) { return "Unknown"; }
    }
    return "Unknown";
  };

  // LOGIC: Send "I'm Safe" + LOCATION + BATTERY
  const handleSafeCheckIn = async () => {
    if (!confirm("Send 'I AM SAFE' with location?")) return;

    setSafeLoading(true);

    // 1. Check if location is "stale" (older than 5 mins)
    // If timestamp is missing, assume it's current or just ignore label
    const isStale = location.timestamp && (Date.now() - location.timestamp) > 300000;
    const locLabel = isStale ? "Last Known Loc" : "Current Loc";

    // 2. Get Location Link
    let locationText = "";
    if (location.lat) {
      // STANDARD GOOGLE MAPS LINK
      locationText = ` ${locLabel}: https://maps.google.com/maps?q=${location.lat},${location.lng}`;
    }

    // 3. Get Battery
    const batt = await getBatteryStatus();

    // 4. Construct Message
    const message = `✅ STATUS: ${userData.name} is SAFE. Network bad, DO NOT CALL. Batt: ${batt}.${locationText}`;

    const payload = {
      phone: userData.phone1,
      message: message
    };

    try {
      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (userData.phone2) {
         await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: userData.phone2, message })
         });
      }

      alert("Safety Message Sent!");
    } catch (err) {
      // Fallback to native SMS
      window.location.href = `sms:${userData.phone1}?body=${encodeURIComponent(message)}`;
    } finally {
      setSafeLoading(false);
    }
  };

  // STATUS BAR LOGIC
  const isGPSStale = location.timestamp && (Date.now() - location.timestamp) > 300000;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Top Status Bar */}
      <div className="absolute top-4 w-full px-6 flex justify-between font-mono text-xs text-gray-500 z-10">
        <div>
           {location.ready && !isGPSStale ? (
              <span className="text-green-500">GPS: LIVE (±{Math.round(location.accuracy)}m)</span>
           ) : location.lat ? (
              <span className="text-orange-500">GPS: OLD/CACHED</span>
           ) : (
              <span className="text-red-500 animate-pulse">SEARCHING...</span>
           )}
        </div>
        <div>
           {location.lat ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "..."}
        </div>
      </div>

      <h1 className="text-xl font-bold text-gray-700 mb-8 tracking-widest z-10">
        {userData.name.toUpperCase()} SAFE-ZONE
      </h1>

      {/* 1. THE MAIN RED BUTTON */}
      <div className="mb-10 z-10">
        <PanicButton userData={userData} location={location} />
      </div>

      {/* 2. THE GREEN "I'M SAFE" BUTTON */}
      <button 
        onClick={handleSafeCheckIn}
        disabled={safeLoading}
        className="z-10 bg-green-900/30 border border-green-600/50 text-green-500 px-8 py-3 rounded-full text-sm font-bold tracking-wider hover:bg-green-900/50 active:scale-95 transition-all flex items-center gap-2"
      >
        {safeLoading ? "SENDING..." : "✅ I AM SAFE"}
      </button>

      {/* BOTTOM ACTION BAR */}
      <div className="absolute bottom-6 w-full px-8 flex justify-between items-center z-10">
        <button onClick={onReset} className="text-xs text-gray-800 hover:text-gray-600">
          Reset
        </button>

        {/* INFO HUB BUTTON */}
        <button onClick={onOpenInfo} className="text-2xl p-2 bg-gray-800 rounded-full border border-gray-600 shadow-lg active:scale-90">
          ℹ️
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [userData, setUserData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('safetyConfig');
    if (saved) setUserData(JSON.parse(saved));
  }, []);

  const handleReset = () => {
    if (confirm("Reset app? You will need to enter contacts again.")) {
      localStorage.removeItem('safetyConfig');
      setUserData(null);
    }
  };

  if (!userData) return <SetupScreen onComplete={(data) => setUserData(data)} />;

  if (showInfo) return <InfoHub onBack={() => setShowInfo(false)} />;

  return (
    <PanicDashboard 
      userData={userData} 
      onReset={handleReset} 
      onOpenInfo={() => setShowInfo(true)} 
    />
  );
}