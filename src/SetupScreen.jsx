// src/SetupScreen.jsx
import { useState } from 'react';

export default function SetupScreen({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    phone1: '',
    phone2: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone1) {
      alert("Please enter your name and at least one contact.");
      return;
    }

    // Save to browser memory
    localStorage.setItem('safetyConfig', JSON.stringify(formData));

    // Tell App.jsx we are done
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center p-6">
      <div className="max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-2 tracking-tighter">
          SECURE SETUP
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Data is stored locally on this device only.
        </p>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">YOUR NAME</label>
            <input 
              type="text" 
              placeholder="e.g. Musa"
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">EMERGENCY PHONE 1</label>
            <input 
              type="tel" 
              placeholder="23480..."
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none transition-colors"
              value={formData.phone1}
              onChange={(e) => setFormData({...formData, phone1: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">EMERGENCY PHONE 2 (OPTIONAL)</label>
            <input 
              type="tel" 
              placeholder="23480..."
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none transition-colors"
              value={formData.phone2}
              onChange={(e) => setFormData({...formData, phone2: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] active:scale-95 transition-all"
          >
            ARM SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
}