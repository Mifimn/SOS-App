// api/send-sos.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. CORS Headers (Allows your React app to talk to this server)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle browser pre-flight checks
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Only allow POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 2. GET DATA
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Missing email or message" });
  }

  // 3. CONFIGURE GMAIL TRANSPORTER
  // This logs into your "Sender" account
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your sender email (from Vercel Secrets)
      pass: process.env.GMAIL_PASS, // Your App Password (from Vercel Secrets)
    },
  });

  try {
    // 4. SEND EMAIL TO FAMILY
    await transporter.sendMail({
      from: `"Safety Alert System" <${process.env.GMAIL_USER}>`,
      to: email, // <--- Sends to the user's specific family email
      subject: "🚨 SOS: EMERGENCY SAFETY ALERT",
      text: `${message}\n\n(Sent via Musa's Safety App)`,
      html: `
        <div style="background-color: #ffe4e4; padding: 20px; border: 4px solid red; font-family: sans-serif;">
          <h1 style="color: red; margin-top: 0;">🚨 EMERGENCY ALERT</h1>
          <p style="font-size: 18px; color: #333;"><strong>${message}</strong></p>
          <hr style="border: 0; border-top: 1px solid #ff9999; margin: 20px 0;">
          <p style="color: #555; font-size: 12px;">
            This alert was triggered by the user via the Safety App. 
            <strong>Click the location link above immediately.</strong>
          </p>
        </div>
      `
    });

    console.log(`Email sent successfully to ${email}`);
    return res.status(200).json({ success: true, message: "Email Sent" });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}