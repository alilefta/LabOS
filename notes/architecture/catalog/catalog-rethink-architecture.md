Here is the **Master Architecture Plan** for the `/catalog` (Product & Pricing Matrix) module, utilizing the **"Sliding Context Window"** pattern.

This plan guarantees 120 FPS performance, seamless mobile-to-desktop responsiveness, and absolute compliance with your Prisma relationships.

---

### THE ARCHITECTURE OVERVIEW

The Catalog uses a **Dynamic 30/70 Split-Screen**. The content of the Left Pane (30%) and Right Pane (70%) morphs based on the URL `searchParams`: `?category=`, `?wt=`, and `?product=`.

#### State Matrix (How the UI Reacts to the URL)

| URL State                 | Left Pane (30%)                 | Right Pane (70%)                   | Mobile Behavior (100% width)              |
| :------------------------ | :------------------------------ | :--------------------------------- | :---------------------------------------- |
| **`/catalog`**            | `CategorySidebar`               | _Empty State_                      | Shows `CategorySidebar`                   |
| **`?category=123`**       | `CategorySidebar` (Active: 123) | `WorkTypeGrid` (For cat 123)       | Shows `WorkTypeGrid` (with Back btn)      |
| **`?wt=456`**             | `ProductSidebar` (For wt 456)   | _Empty State_                      | Shows `ProductSidebar` (with Back btn)    |
| **`?wt=456&product=789`** | `ProductSidebar` (Active: 789)  | `PricingPlanLedger` (For prod 789) | Shows `PricingPlanLedger` (with Back btn) |

---

### SPRINT 1: The Root & The Category Layer

**Goal:** Build the global layout wrapper and the highest level of the hierarchy (`Category`).

- **Step 1.1: `CatalogPage` (Server Component)**
  - Reads `searchParams`.
  - Implements the CSS `hidden lg:flex` logic to handle the mobile/desktop layout shifts.
  - Acts as the Suspense boundary provider.
- **Step 1.2: `CategorySidebar` (Left Pane)**
  - Fetches all `CaseCategory` items.
  - Renders a vertical list. Each item has a `MoreVertical` context menu (Rename, Archive).
  - _Interaction:_ Clicking a category sets `?category=[id]` in the URL.
- **Step 1.3: `WorkTypeBentoGrid` (Right Pane)**
  - Renders when `?category=` is present.
  - Displays `WorkType` items as large, interactive cards.
  - _Interaction:_ Clicking the "Manage Products" button on a card clears the `category` param and sets `?wt=[id]`, triggering the "Sliding Window" shift.

---

### SPRINT 2: The Product Layer (The Context Shift)

**Goal:** Build the views that appear when the user drills down into a specific `WorkType`.

- **Step 2.1: `ProductSidebar` (Left Pane)**
  - Renders when `?wt=` is present.
  - Fetches all `Product` items belonging to that WorkType.
  - Includes a "← Back to Categories" button at the top to escape the context.
  - _Interaction:_ Clicking a product sets `?wt=[id]&product=[id]`.
- **Step 2.2: `DesktopEmptyState` (Right Pane)**
  - A beautiful, glassmorphic placeholder that tells the user to "Select a product from the left to configure its pricing matrix."

---

### SPRINT 3: The Financial Ledger (Level 4)

**Goal:** Build the complex pricing management view for a specific `Product`.

- **Step 3.1: `PricingPlanLedger` (Right Pane)**
  - Renders when `?product=` is present.
  - Fetches all `CasePricingPlan` items for that product.
  - **Section A:** The "Default Lab Rate" (Highlighted as the global baseline).
  - **Section B:** "Custom Clinic Agreements" (A grid/list of overrides for specific clinics).
- **Step 3.2: Integrating the Sheets**
  - Connect your existing `CreatePricingPlanSheet` to the "Add Custom Rate" button.
  - _UX Note:_ The sheet should automatically lock `productId` in its form since we are already inside the product's context!

---

### SECURITY & PERFORMANCE STANDARDS

1.  **Strict URL Validation:** The Server Component will use Zod to validate `searchParams` (e.g., ensuring `category` is a valid UUID). If invalid, it silently redirects to `/catalog`.
2.  **TanStack Query Scoping:** Every data fetch component (`CategorySidebar`, `ProductSidebar`, etc.) will manage its own `useQuery` scoped to the `labId` and the active URL ID. This ensures components can be isolated and re-rendered without triggering global page refreshes.
3.  **Hardware-Accelerated Transitions:** We will use `animate-in slide-in-from-right-4 duration-500` on the Right Pane components to give the user the physical sensation that they are "sliding deeper" into the software.

**Are you ready to begin Sprint 1?** If so, I will provide the code for the `CatalogPage` shell and the `CategorySidebar`.
