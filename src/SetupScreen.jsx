// src/SetupScreen.jsx
import { useState } from 'react';

export default function SetupScreen({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email1: '',   // Primary Email
    email2: '',   // Secondary Email (Optional)
    phone1: ''    // Backup Phone
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email1) {
      alert("Please enter your Name and at least one Family Email.");
      return;
    }
    // Save to LocalStorage
    localStorage.setItem('safetyConfig', JSON.stringify(formData));
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center p-6">
      <div className="max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-2 tracking-tighter">
          SYSTEM SETUP
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Configure who receives your alerts.
        </p>

        <form onSubmit={handleSave} className="space-y-5">
          {/* NAME */}
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">YOUR NAME</label>
            <input 
              type="text" 
              placeholder="e.g. Musa"
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* EMAIL 1 */}
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">PRIMARY EMAIL (Required)</label>
            <input 
              type="email" 
              placeholder="mom@gmail.com"
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none"
              value={formData.email1}
              onChange={(e) => setFormData({...formData, email1: e.target.value})}
            />
          </div>

          {/* EMAIL 2 (NEW) */}
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">SECONDARY EMAIL (Optional)</label>
            <input 
              type="email" 
              placeholder="dad@yahoo.com"
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-blue-500 outline-none"
              value={formData.email2}
              onChange={(e) => setFormData({...formData, email2: e.target.value})}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-xs font-mono text-gray-500 mb-1">BACKUP PHONE (SMS Fallback)</label>
            <input 
              type="tel" 
              placeholder="080..."
              className="w-full bg-gray-900 border border-gray-800 rounded p-4 text-white focus:border-red-500 outline-none"
              value={formData.phone1}
              onChange={(e) => setFormData({...formData, phone1: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 font-bold py-4 rounded shadow-lg hover:bg-red-700 transition-colors mt-4"
          >
            SAVE & ARM
          </button>
        </form>

        <div className="mt-12 text-center">
          <a href="https://mifimn.vercel.app" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-800 font-mono hover:text-red-600">
            Designed by ~mifimn
          </a>
        </div>
      </div>
    </div>
  );
}