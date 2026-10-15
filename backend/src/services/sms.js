"use strict";

// SMS / push service. SMS_PROVIDER=console (dev default) | termii | twilio | fcm.
// Console mode logs instead of sending — safe for local development.

async function sendViaTermii({ to, message }) {
  const res = await fetch("https://api.ng.termii.com/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to,
      from: process.env.TERMII_SENDER_ID || "Marketplace",
      sms: message,
      type: "plain",
      channel: "generic",
      api_key: process.env.TERMII_API_KEY || "",
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Termii failed (${res.status})`);
  return data;
}

async function send({ to, message }) {
  if (!to || !message) throw new Error("to and message are required");
  const provider = (process.env.SMS_PROVIDER || "console").toLowerCase();
  if (provider === "console") {
    console.log(`[sms:console] to=${to} message=${message}`);
    return { delivered: false, mode: "console" };
  }
  if (provider === "termii") {
    if (!process.env.TERMII_API_KEY) throw new Error("TERMII_API_KEY missing");
    return { delivered: true, mode: "termii", response: await sendViaTermii({ to, message }) };
  }
  throw new Error(`SMS_PROVIDER '${provider}' not implemented yet (twilio/fcm TODO)`);
}

function isConfigured() {
  return (process.env.SMS_PROVIDER || "console").toLowerCase() !== "console";
}

module.exports = { send, isConfigured };
