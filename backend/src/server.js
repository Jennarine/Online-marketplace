"use strict";

require("dotenv").config();
const express = require("express");
const paystack = require("./services/paystack");
const email = require("./services/email");
const sms = require("./services/sms");
const shipping = require("./services/shipping");

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "online-marketplace-backend" });
});

// Reports which integrations are configured. Never exposes secret values.
app.get("/api/integrations/status", (req, res) => {
  res.json({
    payments: { provider: "paystack", configured: paystack.isConfigured() },
    email: { provider: process.env.EMAIL_PROVIDER || "console", configured: email.isConfigured() },
    sms: { provider: process.env.SMS_PROVIDER || "console", configured: sms.isConfigured() },
    shipping: { provider: process.env.SHIPPING_PROVIDER || "manual", configured: shipping.isConfigured() },
  });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
}

module.exports = app;
