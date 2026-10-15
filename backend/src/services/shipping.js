"use strict";

// Shipping service. SHIPPING_PROVIDER=manual (dev default: vendor self-delivery)
// or a courier API via SHIPPING_API_URL + SHIPPING_API_KEY.
// Manual mode returns a placeholder — real tracking arrives when a courier is chosen.

async function getQuote({ from, to, weightKg }) {
  const provider = (process.env.SHIPPING_PROVIDER || "manual").toLowerCase();
  if (provider === "manual") {
    return { provider: "manual", amount: null, eta: null, note: "Vendor self-delivery — agree price with vendor" };
  }
  if (!process.env.SHIPPING_API_URL || !process.env.SHIPPING_API_KEY) {
    throw new Error("SHIPPING_API_URL / SHIPPING_API_KEY missing");
  }
  const res = await fetch(`${process.env.SHIPPING_API_URL}/quote`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.SHIPPING_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, weightKg }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Shipping quote failed (${res.status})`);
  return { provider, ...data };
}

function isConfigured() {
  return (process.env.SHIPPING_PROVIDER || "manual").toLowerCase() !== "manual";
}

module.exports = { getQuote, isConfigured };
