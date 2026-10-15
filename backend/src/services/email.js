"use strict";

// Email service. EMAIL_PROVIDER=console (dev default) | sendgrid | mailgun | smtp.
// In console mode messages are logged, not sent — safe for local development.

async function sendViaSendGrid({ to, subject, text }) {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY || ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: process.env.EMAIL_FROM },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });
  if (!res.ok) throw new Error(`SendGrid failed (${res.status})`);
}

async function send({ to, subject, text }) {
  if (!to || !subject || !text) throw new Error("to, subject and text are required");
  const provider = (process.env.EMAIL_PROVIDER || "console").toLowerCase();
  if (provider === "console") {
    console.log(`[email:console] to=${to} subject=${subject} text=${text}`);
    return { delivered: false, mode: "console" };
  }
  if (provider === "sendgrid") {
    if (!process.env.SENDGRID_API_KEY) throw new Error("SENDGRID_API_KEY missing");
    await sendViaSendGrid({ to, subject, text });
    return { delivered: true, mode: "sendgrid" };
  }
  throw new Error(`EMAIL_PROVIDER '${provider}' not implemented yet (mailgun/smtp TODO)`);
}

function isConfigured() {
  return (process.env.EMAIL_PROVIDER || "console").toLowerCase() !== "console";
}

module.exports = { send, isConfigured };
