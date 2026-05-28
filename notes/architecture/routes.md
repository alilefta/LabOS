## General Routing

---

### The Primary Navigation (The Left Sidebar)

These are the routes that users click every single day to run the business.

- `/dashboard` — (Global Analytics & Executive Summary)
- `/cases` — (The Manufacturing Pipeline & Operations)
- `/invoices` — (Accounts Receivable & Revenue Collection)
- `/clinics` — (CRM: Managing Partners & Doctors)

### The Secondary Operations (The "Engine Room")

These are operations managed by Lab Managers, HR, or Lead Technicians. They deserve their own top-level routes because they represent distinct business functions.

- `/team` _(Replacing /staff)_
    - **Purpose:** Where the manager assigns cases, tracks burnout, and manages the internal roster.
    - **Sub-routes:**
        - `/team` (Grid of all staff)
        - `/team/[staffId]` (Staff Dossier: Active workload, performance metrics)
- `/payroll`
    - **Purpose:** Strictly financial. Where the manager calculates commissions.
    - **Why isolate it?** Because a technician might have permission to see `/team` (to see who is working today), but they should _never_ have permission to see `/payroll`. Isolating it makes route-guarding easy.
- `/catalog`
    - **Purpose:** The central pricing and product matrix.
    - **Why isolate it?** Managing what products the lab sells (Zirconia vs PFM) and setting default base prices is a massive task. It needs a dedicated "Bento Grid" UI, not a tiny tab hidden inside `/settings`.

### The System Layer (The Settings Modal/Page)

- `/settings`
    - **Purpose:** Global configuration and account management. This is the "Boring but Necessary" stuff.
    - **Sub-routes (Tabs):**
        - `/settings/profile` (My personal account, change password)
        - `/settings/preferences` (Dark mode, default views)
        - `/settings/notifications` (Email vs Push alerts)
        - `/settings/lab` (Lab Name, Logo, Global Address)
        - `/settings/billing` (Your Stripe subscription to use LabOS)
        - `/settings/security` (2FA, Active Sessions)

---

### Why this Route Architecture is Elite:

1.  **Permission Tiers are Natural:**
    - **Technician Role:** Only sees `/dashboard` (their own stats), `/cases`, and `/settings`.
    - **Accountant Role:** Only sees `/dashboard`, `/invoices`, `/clinics`, and `/settings`.
    - **Owner Role:** Sees everything (`/payroll`, `/catalog`, `/team`).
      By organizing routes by business function, your Next.js middleware can easily block unauthorized users based on the URL path.
2.  **Cognitive Load Reduction:** If a lab owner wants to change the price of a crown, they go to `/catalog`. If they want to change their credit card for the software subscription, they go to `/settings/billing`. Mixing these together causes immense frustration.
3.  **Scalability:** If you later add an "Inventory Management" feature (tracking how many Zirconia blocks are left in the fridge), you simply add an `/inventory` route. The architecture breathes.

---
