// api/send-sos.js
// Vercel Serverless Function

export default async function handler(req, res) {
  // CORS Headers (Allow connections)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle "OPTIONS" preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { phone, message } = req.body;

  // --- DEV MODE (Use this until Termii approves you) ---
  const isDevMode = true; // Set to false when approved

  if (isDevMode) {
    console.log(`[Vercel Log] Mock SMS to ${phone}: ${message}`);
    return res.status(200).json({ success: true, message: "Dev Mode: Simulated" });
  }
  // ----------------------------------------------------

  // --- REAL TERMII CODE (Uncomment this on Monday) ---
  /*
  const API_KEY = process.env.TERMII_API_KEY;
  const SENDER_ID = process.env.TERMII_SENDER_ID || "MySOS";

  try {
    const response = await fetch('https://api.ng.termii.com/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phone,
        from: SENDER_ID,
        sms: message,
        type: "plain",
        channel: "dnd",
        api_key: API_KEY,
      })
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
  */
}