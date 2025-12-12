// src/hooks/useGeoLocation.js
import { useState, useEffect } from "react";

export function useGeoLocation() {
  // 1. Initialize with "Last Known Location" from memory (Instant Load)
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('lastKnownLocation');
    return saved ? JSON.parse(saved) : {
      lat: null,
      lng: null,
      accuracy: null,
      ready: false,
      timestamp: null
    };
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    // 2. Success Handler
    const handleSuccess = (pos) => {
      const newLoc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        ready: true,
        timestamp: Date.now() // Track when we got this
      };

      // Update State (UI)
      setLocation(newLoc);

      // Update Memory (Cache for next time)
      localStorage.setItem('lastKnownLocation', JSON.stringify(newLoc));
    };

    const handleError = (err) => {
      console.error("GPS Error:", err);
      // We keep the old location if GPS fails, so we aren't "blind"
    };

    // 3. Start Watching Immediately
    const watcher = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 
      }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return location;
}