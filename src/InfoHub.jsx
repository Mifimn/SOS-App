// src/InfoHub.jsx
import { useState, useEffect } from 'react';

export default function InfoHub({ onBack }) {
  const [info, setInfo] = useState({
    police: "08012345678", // Default placeholder
    vigilante: "08098765432",
    doctor: "08055555555",
    blood: "O+",
    allergies: "None"
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load saved info on mount
  useEffect(() => {
    const saved = localStorage.getItem('offlineInfo');
    if (saved) setInfo(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem('offlineInfo', JSON.stringify(info));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-20">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-yellow-500 tracking-wider">OFFLINE HUB</h1>
        <button onClick={onBack} className="text-gray-400 text-sm border border-gray-600 px-3 py-1 rounded">
          CLOSE
        </button>
      </div>

      {/* READ MODE (Big Buttons for Panic) */}
      {!isEditing && (
        <div className="space-y-6">
          <div className="grid gap-4">
             <a href={`tel:${info.police}`} className="bg-blue-900/50 border border-blue-500 p-6 rounded-lg flex justify-between items-center active:bg-blue-800">
               <div>
                 <div className="text-xs text-blue-300 font-mono">NEAREST POLICE (DPO)</div>
                 <div className="text-2xl font-bold tracking-widest">{info.police}</div>
               </div>
               <span className="text-2xl">📞</span>
             </a>

             <a href={`tel:${info.vigilante}`} className="bg-yellow-900/30 border border-yellow-600 p-6 rounded-lg flex justify-between items-center active:bg-yellow-800">
               <div>
                 <div className="text-xs text-yellow-300 font-mono">LOCAL VIGILANTE</div>
                 <div className="text-2xl font-bold tracking-widest">{info.vigilante}</div>
               </div>
               <span className="text-2xl">📞</span>
             </a>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <h2 className="text-gray-500 text-xs font-mono mb-4">MEDICAL IDENTITY</h2>
            <div className="bg-gray-800 p-4 rounded flex justify-between">
              <div>
                <span className="block text-gray-500 text-[10px]">BLOOD TYPE</span>
                <span className="text-3xl font-black text-red-500">{info.blood}</span>
              </div>
              <div className="text-right max-w-[50%]">
                <span className="block text-gray-500 text-[10px]">ALLERGIES / NOTES</span>
                <span className="text-sm font-bold text-white">{info.allergies}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(true)}
            className="w-full text-center text-gray-600 text-xs mt-8 underline"
          >
            Edit Information
          </button>
        </div>
      )}

      {/* EDIT MODE (Form) */}
      {isEditing && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500">Police / DPO Number</label>
            <input 
              type="tel" 
              value={info.police}
              onChange={(e) => setInfo({...info, police: e.target.value})}
              className="w-full bg-black border border-gray-700 p-3 rounded text-white"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Vigilante / Security</label>
            <input 
              type="tel" 
              value={info.vigilante}
              onChange={(e) => setInfo({...info, vigilante: e.target.value})}
              className="w-full bg-black border border-gray-700 p-3 rounded text-white"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/3">
                <label className="text-xs text-gray-500">Blood</label>
                <input 
                type="text" 
                value={info.blood}
                onChange={(e) => setInfo({...info, blood: e.target.value})}
                className="w-full bg-black border border-gray-700 p-3 rounded text-white"
                />
            </div>
            <div className="w-2/3">
                <label className="text-xs text-gray-500">Allergies</label>
                <input 
                type="text" 
                value={info.allergies}
                onChange={(e) => setInfo({...info, allergies: e.target.value})}
                className="w-full bg-black border border-gray-700 p-3 rounded text-white"
                />
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="w-full bg-green-700 text-white py-3 rounded font-bold mt-4"
          >
            SAVE CHANGES
          </button>
        </div>
      )}
    </div>
  );
}