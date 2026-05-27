This is the absolute financial bottleneck of a dental lab. If this page is clunky, accountants will delay generating invoices, which directly hurts the lab's cash flow.

To build an "Awwwards-Level" B2B billing engine, we must move away from the concept of a "Form" and build a **"Reconciliation Workspace."**

Here is the architectural blueprint, UX plan, and security model for the `/invoices/new-invoice` route.

---

### PHASE 1: The UX Architecture (Visual Layout)

We will use a **70/30 Split-Screen Canvas**, heavily tinted with our Financial `Emerald` palette.

**The Left Pane (30%): The Invoice Configuration**
This is a sticky, narrow column focused purely on metadata and financial terms.

- **Clinic Selector:** Only displays clinics that actually have unbilled cases. If opened via the Dashboard QuickBar (`?clinicId=XYZ`), this is pre-filled and locked.
- **Billing Terms:** A segmented control for Due Dates (`Due on Receipt`, `Net 15`, `Net 30`, `Custom`).
- **Global Adjustments:** A dedicated input for an `Invoice-Level Discount` (e.g., "Take 5% off the whole batch") and a `Discount Reason` field.
- **Accountant Notes:** A memo field that will appear on the final PDF.

**The Right Pane (70%): The Reconciliation Board**
This is a massive, interactive ledger that appears as soon as a Clinic is selected.

- **The Unbilled Queue:** A rich list of all `COMPLETED` or `DELIVERED` cases for the selected clinic.
- **UX Magic (The Cart Model):** Each case row has a checkbox. By default, a "Select All" toggle is checked. If a doctor called yesterday to dispute a specific case, the accountant simply unchecks it, leaving it in the queue for next month.
- **The Live Receipt (Footer):** A floating, frosted-glass footer at the bottom of the right pane. It watches the checkboxes in real-time and calculates the Subtotal, Discount, and Grand Total. It houses the glowing "Generate Invoice" button.

#### Phase 1: Architectural Blueprint (Foundations & Layout) in details

Following our strict **"No Code Until Asked"** rule, here is the exact tactical plan for executing **Phase 1 (The Layout, Hydration, and Shells)**.

### Step 1: Server-Side Hydration (The Gateway)

The entry point (`/app/(main)/invoices/new-invoice/page.tsx`) will act as the server-side traffic controller.

- **We will read `searchParams.clinicId`:**
    - **Scenario A (Drilled Down):** If the user clicked a clinic from the "Revenue Radar" (`?clinicId=XYZ`), the server will immediately fetch that clinic's full metadata and prefetch their active unbilled cases (`status: COMPLETED | DELIVERED`, `invoiceCase: null`).
    - **Scenario B (Blank State):** If they clicked "New Invoice" globally, the server will fetch a list of _only_ the clinics that currently have unbilled cases, which we will use to populate the dropdown on the left.
- **Security:** Both queries will be wrapped in your strict `getServerSession` and `tenantPrisma` guards.

### Step 2: The Split-Screen Shell (`NewInvoiceClient`)

This is the master client wrapper. It will receive the server-hydrated data and establish the spatial layout.

- **Sizing & Alignment:** It will use your standardized `max-w-[2000px] mx-auto` container with matching px padding [2].
- **Scrolling Physics:** To prevent the "double-scrollbar" bug, the Left Pane (30%) will be set to `sticky top-28 h-fit` (staying locked), while the Right Pane (70%) gets `h-full overflow-y-auto` so it can handle 50+ cases scrolling independently.

### Step 3: The Left Pane Shell (`InvoiceConfigurationPane`)

This houses the metadata. We will initialize a localized React Hook Form instance _only_ for this pane, since its inputs are simple.

- **The Clinic Selector:** If a `clinicId` was in the URL, this selector renders as a beautiful, locked read-only card showing the clinic's name (preventing them from changing the clinic mid-billing). If no ID was present, it renders as a searchable combobox.
- **The Terms Toggle:** A segmented horizontal switch for Due Dates (Receipt, Net 15, Net 30, Custom).
- **The Discount Card:** Inputs for `appliedDiscountPercentage` and `discountReason` in their own emerald-tinted container.

### Step 4: The Right Pane Shell (`ReconciliationLedger`)

This is the workspace container.

- **The State Hook:** We will initialize the local React `useState(new Set<string>())` here.
- **The Case List Container:** An empty list container styled with a dotted border, ready to render the active cases when we build them.
- **The Sticky Footer (`LiveReceiptFooter`):** A frosted-glass (`backdrop-blur-xl bg-background/80`) block anchored to the bottom of the right pane using `sticky bottom-0`. It will house the visual totals (Subtotal, Discount, Grand Total) and the primary "Generate Invoice" button.

---

### PHASE 2: The Logical Workflow (Step-by-Step)

1.  **Context Hydration:** The Server Component checks for `?clinicId=...` in the URL. If present, it prefetches all unbilled cases for that clinic. If not, it fetches a list of eligible clinics.
2.  **Selection & Math:** The accountant selects the clinic. The right pane populates with 20 cases. They uncheck 2 of them. The "Live Receipt" instantly recalculates the sums.
3.  **Financial Override:** The accountant applies a 10% discount to the batch. The Live Receipt updates to show `Subtotal - Discount = Amount Due`.
4.  **Execution (The Handshake):** They click "Generate Invoice." A confirmation modal appears showing the final numbers and asking: _"Save as Draft or Send via WhatsApp/Email immediately?"_

---

### PHASE 3: State Management Strategy

To ensure zero lag while checking/unchecking 50+ cases, we will use a highly optimized client-side architecture:

- **No React Hook Form for the Cases Array:** Putting 50 dynamic checkboxes inside a Zod/RHF array will cause massive re-render lag.
- **The "Set" Pattern:** We will track selected cases using a React `Set<string>`. Checking a box simply adds the `caseId` to the Set in `O(1)` time.
- **Zod for Metadata Only:** RHF and Zod will _only_ be used for the Left Pane (Terms, Discount, Notes).
- **Derived Math:** We use `useMemo` to intersect the raw fetched cases with the `Set` of selected IDs to calculate the Grand Total in < 1ms.

---

### PHASE 4: Security & Database Integrity (The ERP Rules)

This is where the "Enterprise" part comes in. We must protect the database from double-billing and price-drifting.

1.  **The "Null" Query Constraint:**
    - The server action that fetches cases MUST strictly enforce: `status: { in: ["COMPLETED", "DELIVERED"] }` AND `invoiceCase: null`. We never fetch a case that is already billed.
2.  **The Price Snapshot Rule (Critical):**
    - When the invoice is generated, the backend does _not_ just link the `Case` ID to the `Invoice`.
    - It must read `case.grandTotal` and write it explicitly to `InvoiceCase.caseTotal`. This guarantees that if a case's price is somehow edited 6 months from now, this historical invoice's math will never be corrupted.
3.  **The Atomic Transaction:**
    - The creation of the `Invoice`, the creation of the `InvoiceCase` junction records, and the generation of the `publicToken` must happen inside a single Prisma `$transaction`. If one fails, the whole operation rolls back.
4.  **Concurrency Protection:**
    - If two accountants click "Generate" at the exact same time, Prisma's `@@unique([caseId])` on the `InvoiceCase` table will physically block the database from allowing a case to be double-billed, throwing an error that we catch gracefully.

---

### The "Awwwards" Value Proposition

Standard dental software makes invoicing a tedious, click-heavy spreadsheet task. By treating invoice generation like an "E-commerce Checkout Cart" (Left side = Shipping/Terms, Right side = Cart items, Footer = Total), we map the software directly to the mental model of modern users.

**Do you approve of this Split-Screen Configuration/Reconciliation architecture?** If so, I am ready to define the specific DTOs and Schemas for the Batch Generator!
