// src/App.jsx
import { useState, useEffect } from 'react';
import SetupScreen from './SetupScreen';
import PanicButton from './PanicButton';
import InfoHub from './InfoHub'; 
import { useGeoLocation } from './hooks/useGeoLocation';

const BACKEND_URL = "/api/send-sos";

function PanicDashboard({ userData, onReset, onOpenInfo }) {
  const location = useGeoLocation();
  const [safeLoading, setSafeLoading] = useState(false);

  const getBatteryStatus = async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        return `${Math.round(battery.level * 100)}%`;
      } catch (e) { return "Unknown"; }
    }
    return "Unknown";
  };

  const handleSafeCheckIn = async () => {
    if (!confirm("Send 'I AM SAFE' email to family?")) return;
    setSafeLoading(true);

    const isStale = location.timestamp && (Date.now() - location.timestamp) > 300000;
    const locLabel = isStale ? "Last Known Loc" : "Current Loc";

    let locationText = "";
    if (location.lat) {
      // FIXED LINK: Uses official http://googleusercontent.com/maps.google.com/
      locationText = ` ${locLabel}: http://googleusercontent.com/maps.google.com/maps?q=${location.lat},${location.lng}`;
    }

    const batt = await getBatteryStatus();
    const message = `✅ STATUS: ${userData.name} is SAFE. Network is bad, please DO NOT CALL yet. Batt: ${batt}.${locationText}`;

    // COMBINE EMAILS LOGIC
    const recipients = userData.email2 
      ? `${userData.email1},${userData.email2}` 
      : userData.email1;

    const payload = {
      email: recipients, // Sends to both at once
      message: message
    };

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if(res.ok) alert("Email Alert Sent!");
      else throw new Error("Server Error");

    } catch (err) {
      window.location.href = `sms:${userData.phone1}?body=${encodeURIComponent(message)}`;
    } finally {
      setSafeLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

      <div className="absolute top-4 w-full px-6 flex justify-between font-mono text-xs text-gray-500 z-10">
        <div>
           {location.ready ? <span className="text-green-500">GPS: LIVE (±{Math.round(location.accuracy)}m)</span> : <span className="text-yellow-500 animate-pulse">SEARCHING...</span>}
        </div>
        <div>{location.lat ? `${location.lat.toFixed(4)}` : "..."}</div>
      </div>

      <h1 className="text-xl font-bold text-gray-700 mb-8 tracking-widest z-10">
        {userData.name.toUpperCase()} SAFE-ZONE
      </h1>

      <div className="mb-10 z-10">
        <PanicButton userData={userData} location={location} />
      </div>

      <button 
        onClick={handleSafeCheckIn}
        disabled={safeLoading}
        className="z-10 bg-green-900/30 border border-green-600/50 text-green-500 px-8 py-3 rounded-full text-sm font-bold tracking-wider hover:bg-green-900/50 active:scale-95 transition-all flex items-center gap-2"
      >
        {safeLoading ? "SENDING..." : "✅ I AM SAFE"}
      </button>

      <div className="absolute bottom-6 w-full px-8 flex justify-between items-center z-10">
        <button onClick={onReset} className="text-xs text-gray-800 hover:text-gray-600">Reset</button>

        {/* DESIGNER CREDIT */}
        <a 
          href="https://mifimn.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-orange-800 font-mono tracking-widest hover:text-red-600 transition-colors opacity-50 hover:opacity-100"
        >
          ~mifimn
        </a>

        <button onClick={onOpenInfo} className="text-2xl p-2 bg-gray-800 rounded-full border border-gray-600 active:scale-90">ℹ️</button>
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
    if (confirm("Reset app data?")) {
      localStorage.removeItem('safetyConfig');
      setUserData(null);
    }
  };

  if (!userData) return <SetupScreen onComplete={(data) => setUserData(data)} />;
  if (showInfo) return <InfoHub onBack={() => setShowInfo(false)} />;
  return <PanicDashboard userData={userData} onReset={handleReset} onOpenInfo={() => setShowInfo(true)} />;
}