// src/PanicButton.jsx
import { useState, useRef } from 'react';

// Vercel API Path
const BACKEND_URL = "/api/send-sos";

export default function PanicButton({ userData, location }) {
  const [status, setStatus] = useState('IDLE'); 
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const vibrate = (pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const startPress = () => {
    if (status === 'SENT') return;
    setStatus('PRESSING');
    vibrate(50);

    let currentProgress = 0;
    // 3 seconds to trigger
    timerRef.current = setInterval(() => {
      currentProgress += 1; 
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timerRef.current);
        triggerSOS();
      }
    }, 30);
  };

  const endPress = () => {
    if (status === 'SENT') return;
    clearInterval(timerRef.current);
    setStatus('IDLE');
    setProgress(0);
  };

  const getBatteryStatus = async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        return `${Math.round(battery.level * 100)}%`;
      } catch (e) { return "Unknown"; }
    }
    return "Unknown";
  };

  const triggerSOS = async () => {
    setStatus('SENDING');
    vibrate([200, 100, 200, 100, 500]); // SOS Vibe

    // 1. Check Age of GPS Data
    const isStale = location.timestamp && (Date.now() - location.timestamp) > 300000;
    const locLabel = isStale ? "LAST KNOWN LOC" : "Loc";

    // 2. Get Map Link (STANDARD FORMAT)
    // Note: We use the "16" zoom level format which is very reliable
    const mapLink = `http://googleusercontent.com/maps.google.com/maps?q=${location.lat},${location.lng}`;

    // 3. Get Battery
    const batt = await getBatteryStatus();

    // 4. Prepare Message
    const message = `SOS! ${userData.name} initiated a SILENT ALERT. DO NOT CALL. ${locLabel}: ${mapLink} (Acc: ${Math.round(location.accuracy)}m, Batt: ${batt}).`;

    // 5. COMBINE EMAILS LOGIC (Send to both if available)
    const recipients = userData.email2 
      ? `${userData.email1},${userData.email2}` 
      : userData.email1;

    // 6. Payload (Uses Email now)
    const payload = {
      email: recipients, 
      message: message
    };

    try {
      // 7. SEND TO VERCEL BACKEND
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // If success (Status 200-299)
      if (res.ok) {
        setStatus('SENT');
        alert("SOS Email Sent Successfully!"); // Confirmation
      } else {
        // If server error (e.g. 500 or 404), throw error to trigger SMS fallback
        throw new Error("Server failed");
      }

    } catch (err) {
      console.error("API Failed", err);
      setStatus('ERROR');

      // 8. FALLBACK: ONLY OPEN SMS IF EMAIL FAILS
      // This ensures you are never stranded without a way to send help
      alert("Internet Error: Switching to SMS Mode");
      window.location.href = `sms:${userData.phone1}?body=${encodeURIComponent(message)}`;
    }
  };

  // STYLE LOGIC
  let buttonColor = "bg-red-600 border-gray-800";
  let buttonText = "HOLD SOS";

  if (status === 'PRESSING') buttonColor = "bg-red-700 scale-95 border-red-500";
  if (status === 'SENT') {
      buttonColor = "bg-green-600 border-green-800";
      buttonText = "SENT";
  }
  if (status === 'ERROR') {
      buttonColor = "bg-yellow-600 border-yellow-800";
      buttonText = "SMS APP";
  }

  return (
    <div className="relative">
        <button
          onMouseDown={startPress}
          onMouseUp={endPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          className={`
            w-64 h-64 rounded-full border-8 flex items-center justify-center
            text-3xl font-black tracking-widest text-white transition-all duration-100
            ${buttonColor} ${status === 'IDLE' ? 'animate-pulse' : ''}
            select-none touch-none
          `}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {buttonText}
        </button>

        {status === 'PRESSING' && (
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full border-8 border-white opacity-50 pointer-events-none"
                 style={{ clipPath: `circle(${progress}% at 50% 50%)` }}
            />
        )}
    </div>
  );
}