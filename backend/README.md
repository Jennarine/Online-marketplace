# Backend — Online Marketplace

Node.js + Express API. External services are env-configured; no secrets in code.

## Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
node src/server.js
```

## Endpoints

* `GET /api/health` — liveness check.
* `GET /api/integrations/status` — which services are configured (no secret values exposed).

## External services

| Service | Provider | Env keys | Dev default |
|---|---|---|---|
| Payments | Paystack (test mode) | `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`, `PAYSTACK_WEBHOOK_SECRET` | unconfigured |
| Email | console / SendGrid | `EMAIL_PROVIDER`, `EMAIL_FROM`, `SENDGRID_API_KEY` | console (logs only) |
| SMS/Push | console / Termii | `SMS_PROVIDER`, `TERMII_API_KEY`, `TERMII_SENDER_ID` | console (logs only) |
| Shipping | manual / courier API | `SHIPPING_PROVIDER`, `SHIPPING_API_URL`, `SHIPPING_API_KEY` | manual (vendor self-delivery) |

Get Paystack test keys from the Paystack dashboard (Settings → API Keys). Keep `.env` local — it is gitignored.
