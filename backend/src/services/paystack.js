"use strict";

// Paystack integration (test mode first).
// Docs: https://paystack.com/docs/api/
// All secrets come from env — never hardcode keys here.

const PAYSTACK_BASE = "https://api.paystack.co";

function secretKey() {
  return process.env.PAYSTACK_SECRET_KEY || "";
}

function isConfigured() {
  return Boolean(secretKey());
}

async function paystackFetch(path, options = {}) {
  const res = await fetch(`${PAYSTACK_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Paystack request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Initialize a transaction. Returns { authorization_url, access_code, reference }.
async function initializeTransaction({ email, amountKobo, reference, metadata = {} }) {
  if (!isConfigured()) throw new Error("Paystack not configured (PAYSTACK_SECRET_KEY missing)");
  if (!email || !amountKobo) throw new Error("email and amountKobo are required");
  return paystackFetch("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({ email, amount: amountKobo, reference, metadata }),
  });
}

// Verify a transaction by reference. Returns the verification payload.
async function verifyTransaction(reference) {
  if (!isConfigured()) throw new Error("Paystack not configured (PAYSTACK_SECRET_KEY missing)");
  if (!reference) throw new Error("reference is required");
  return paystackFetch(`/transaction/verify/${encodeURIComponent(reference)}`);
}

module.exports = { isConfigured, initializeTransaction, verifyTransaction };
