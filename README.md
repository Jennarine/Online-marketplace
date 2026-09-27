# Online Marketplace

Web platform connecting vendors with customers. Vendors create stores, upload products, manage inventory, and fulfill orders. Customers browse, compare, checkout securely, and track deliveries.

## Status

PRD v2.1 (stack locked: React + Node/Express + MongoDB local, JWT). Phase 1 homepage done (`index.html`).

See `PRD.md` for full requirements: objectives, user stories, functional specs (§7), data entities (§8), NFRs (§9), MVP scope (§11), stack (§14), implementation plan (§15).

## MVP Summary

* Auth + 3 roles: customer / vendor / admin
* Stores + product CRUD + search/filter
* Multi-vendor cart, single payment provider, basic tracking
* Reviews (post-delivery only), vendor dashboard, admin verification/moderation

Out of scope for MVP: native apps, multi-currency/language, auctions, live chat, advanced logistics.

## Repo Structure

```
.
├── PRD.md          # PRD v2.1
├── README.md
├── index.html      # Phase 1 working homepage
└── design.html     # earlier design draft
```

## Open Decisions

1. Payment provider?
2. Delivery: vendor self-delivery vs platform courier?
3. Commission/fee model?
4. Return/refund window?
5. Vendor KYC documents?

## Next Steps

1. Answer open decisions above.
2. Define API contract + validation rules.
3. Scaffold frontend/backend.
4. Implement MVP flows end-to-end (search → cart → checkout → track → review).
