# Product Requirements Document (PRD) — Online Marketplace

**Version:** 2.1 (Stack + Implementation Plan locked)
**Status:** Approved for implementation
**Tech stance:** React + Node.js/Express + MongoDB (local dev), JWT auth, local file storage

## 1. Product Name

Online Marketplace

## 2. Product Overview

Online Marketplace is a web platform that connects vendors with customers. Vendors can create stores, upload products, manage inventory, and fulfill orders. Customers can browse products, compare prices, place orders, make secure payments, and track deliveries from purchase to arrival.

Goal: make buying and selling online simple, secure, and accessible for businesses and shoppers.

## 3. Problem Statement

Many small businesses struggle to sell online because existing e-commerce platforms can be expensive or difficult to use. Customers also find it hard to discover trusted vendors, compare products, and track orders from multiple sellers.

This platform solves this by providing one marketplace where vendors can easily sell and customers can shop confidently.

## 4. Objectives & Success Metrics

Objectives:
* Enable vendors to sell products online.
* Allow customers to discover products from different vendors.
* Provide secure online payments.
* Enable order tracking from purchase to arrival.
* Build trust through ratings and reviews.
* Create an easy-to-use shopping experience.

Success metrics (MVP, first 3 months):
* ≥50 verified vendors onboarded.
* ≥500 listed products, <5% takedown rate.
* Checkout conversion ≥2%.
* Payment success rate ≥98%.
* Order tracking usage ≥80% of orders.

## 5. Target Users

### Vendors
* Small businesses, retail stores, local market sellers, home-based businesses.
* Needs: low setup friction, inventory control, sales visibility.

### Customers
* Individuals, families, students, businesses purchasing products.
* Needs: search/filter, price comparison, secure checkout, tracking.

### Admins
* Platform operators.
* Needs: vendor verification, fraud removal, user/transaction oversight, analytics.

## 6. User Stories

### Customer
* Create an account, log in, manage profile.
* Search for products, filter by category and price, view details.
* Add items to cart, save to wishlist, checkout securely.
* View order history, track order, receive notifications.
* Review products after delivery.

### Vendor
* Register business, create online store (name, logo, description).
* Upload/edit products (title, images, price, stock, category).
* Manage inventory and prices.
* Receive orders, update fulfillment/delivery status.
* View sales reports.

### Admin
* Verify/reject vendors.
* Remove fraudulent listings, suspend users.
* Monitor transactions, refund/dispute handling.
* View platform analytics (GMV, orders, users, top categories).

## 7. Functional Requirements

### 7.1 Customer Features
* Registration/login (email + password, password reset), guest browsing.
* Product search (keyword), category browse, filter (price, rating, vendor), sort (relevance, price, newest).
* Product detail: images, price, stock status, vendor info, ratings/reviews.
* Shopping cart (multi-vendor support), wishlist.
* Secure checkout: shipping address, order summary, payment.
* Order history, order tracking timeline, notifications (order confirmed/shipped/delivered).
* Reviews and ratings (only after delivered order).

Acceptance: customer can search → add to cart → checkout → track → review without admin help.

### 7.2 Vendor Features
* Business registration + KYC fields (business name, contact, ID/tax where applicable).
* Store profile management.
* Product CRUD with image upload (min 1, max 8), stock quantity, SKU optional.
* Inventory alerts (low-stock threshold).
* Order inbox: new / preparing / shipped / delivered / cancelled.
* Delivery status updates trigger customer notifications.
* Sales dashboard: revenue, units, top products, by date range.

Acceptance: vendor can go from registration → verified → live product → fulfill order.

### 7.3 Admin Features
* Vendor verification queue (approve/reject with reason).
* Product/user moderation (remove listing, suspend account with audit log).
* Transaction monitor + refund/dispute workflow.
* Platform analytics dashboard.
* Role-based access: admin vs support (read-only vs action).

### 7.4 Cross-cutting
* Order lifecycle: `Pending Payment > Paid > Preparing > Shipped > Delivered` + `Cancelled / Refunded`.
* Multi-vendor cart splits into per-vendor sub-orders for fulfillment.
* Payments: third-party provider integration, no card storage on platform; support refunds.
* Notifications: in-app + email (MVP); SMS/push deferred to Phase 2.

## 8. Data Entities (High-Level)

* User (customer/vendor/admin, auth, profile)
* Store (owner, verification status, profile)
* Product (store, title, description, price, stock, category, images, status)
* Category
* Cart / CartItem
* Order + OrderItem (per-vendor split, status timeline)
* Payment (order, provider ref, amount, status)
* Review (product, order ref, rating 1-5, text)
* Notification

## 9. Non-Functional Requirements

* Usability: mobile-responsive, checkout in ≤4 steps.
* Performance: catalog search <2s at 10k products; 99% uptime target.
* Security: hashed passwords, HTTPS, input validation, RBAC, audit logs for admin actions.
* Privacy: minimal PII, consent for marketing, data export/delete on request.
* Scalability: support 100 concurrent checkouts without degradation (MVP target).

## 10. Out of Scope (MVP)

* Native mobile apps, live chat/bargaining, auctions, multi-currency, multi-language, advanced logistics integration, vendor subscriptions/ads.

## 11. MVP Scope & Phase 2 Roadmap

MVP:
* Auth, stores, product CRUD, search/filter, cart, single payment method, basic tracking, reviews, vendor dashboard basic, admin verification/moderation.

Phase 2:
* Wishlist sharing, coupons/discounts, advanced analytics, SMS/push, shipping provider API, dispute automation, vendor payouts ledger, mobile apps.

## 12. Open Questions

1. Payment provider(s) for launch?
2. Who handles delivery — vendor self-delivery or platform courier?
3. Commission/fee model?
4. Return/refund policy window?
5. Vendor verification documents required?

## 13. Acceptance Criteria (Release Gate)

* All MVP flows tested end-to-end for 3 roles.
* Payment success/refund path verified in sandbox + live smoke test.
* No critical security issues (auth bypass, IDOR on orders).
* Admin can verify vendor and remove listing with audit trail.

## 14. Technology Stack (Locked)

* Framework: React
* Backend: Node.js + Express
* Database: MongoDB (runs locally for now)
* Authentication: JWT Authentication
* File Storage: Local storage/uploads for now
* Environment: App and database both run locally during development.

## 15. Implementation Plan

* Phase 1: Set up project structure and homepage.
* Phase 2: Build vendor registration and login.
* Phase 3: Build customer registration and login.
* Phase 4: Create vendor dashboard and product management.
* Phase 5: Create customer shopping, cart, checkout, and order tracking.
* Phase 6: Testing and future improvements.

## 16. Decision Note

I chose MongoDB because it is flexible for storing products, vendors, customers, and orders. The application and database will run locally during development before cloud deployment.

## 17. Design Refinement Note

Improved readability with larger fonts, increased button contrast, added rounded corners, and improved spacing for a cleaner user interface.
