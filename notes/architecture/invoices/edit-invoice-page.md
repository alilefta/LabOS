This is the architectural blueprint for the **Draft Invoice Editor** (`/invoices/[invoiceId]/edit`).

Since an invoice in the `DRAFT` state hasn't impacted the clinic's public ledger yet, the accountant has full unrestricted access to modify the "Cart" (the cases attached to it) and the "Terms" (discounts, notes).

However, building an edit page for a "Cart" of cases requires a very specific database union trick to ensure the UI behaves perfectly.

Here is the step-by-step architectural plan.

---

### PHASE 1: Server Hydration & Security Guards (`page.tsx`)

The server component acts as the ultimate security checkpoint.

1.  **The Fetch:** Retrieve the `Invoice` by ID, strictly scoping to `ctx.labId`.
2.  **The State Lockout:**
    - If `invoice.status !== "DRAFT"`, we immediately `redirect("/invoices/[invoiceId]?action=adjust")`. We physically prevent the user from rendering the full-page editor if the invoice is already `SENT`, `PARTIAL`, or `PAID`.
3.  **The DTO Mapping:** Extract the scalar fields (discount, notes, billing terms) into the `UpdateInvoiceInput` shape to hydrate React Hook Form.

### PHASE 2: The Custom "Union" Data Fetcher (Crucial Step)

In the _New_ Invoice page, our TanStack query fetched `getUnbilledCases` (cases where `invoiceCase === null`).

If we use that same fetcher for the _Edit_ page, the cases already attached to this draft won't show up in the list!

- **The Architecture Rule:** We must create a new server action: `getDraftEligibleCasesAction`.
- **The Database Query:** It queries cases for this clinic where status is `COMPLETED` or `DELIVERED`, AND:
    - `invoiceCase: null` **OR**
    - `invoiceCase.invoiceId: currentDraftInvoiceId`
- **The Result:** The client receives a single array containing both the unbilled cases _and_ the cases currently sitting in this draft.

### PHASE 3: Client State Management (The Shell)

We will reuse the exact 70/30 Split-Screen Canvas from `/invoices/new`, passing a `mode="edit"` prop to adapt the UI.

1.  **Clinic Lock:** The Left Pane's Clinic Selector is permanently locked to the drafted clinic. You cannot change the clinic of an existing draft (if they want to do that, they must void the draft and start over).
2.  **The `Set` Initialization:** When the data loads, the `useState<Set<string>>` will be initialized _only_ with the IDs of the cases that actually belong to the draft, leaving the unbilled ones unchecked.
3.  **Mathematical Recalculation:** As the accountant checks/unchecks boxes, the `useMemo` engine calculates the new Subtotal, Discount, and Grand Total exactly as it did in the creation flow.

### PHASE 4: The Atomic Server Action (`updateDraftInvoiceAction`)

When the accountant clicks "Save Draft" or "Issue Invoice," we pass the new array of `caseIds` to the server. The backend must do a **Diff & Snapshot**:

1.  **Compare State:** Determine which cases were _added_ and which were _removed_.
2.  **The Transaction:**
    - `deleteMany` from `InvoiceCase` where the case ID is no longer in the submitted list (releasing them back to the unbilled queue).
    - `create` new `InvoiceCase` rows for newly checked cases, explicitly applying the **Price Snapshot Rule** (`caseTotal: current.grandTotal`).
    - Update the `Invoice` row with the new recalculated `subtotal`, `discount`, and `total`.
    - If the user clicked "Issue Invoice", flip the status to `SENT`, generate the `publicToken`, set the `issuedAt` date, and update the Clinic's `currentBalance`.

---

### The UX "Awwwards" Touches for Edit Mode:

- **Visual Warning:** At the top of the Reconciliation Ledger (Right Pane), a subtle amber banner reminds the user: _"You are editing a Draft. Unchecking a case will return it to the clinic's unbilled queue."_
- **Action Buttons:** The modal that appears when clicking "Generate" will say **"Update Draft"** (Ghost Button) and **"Issue & Lock Invoice"** (Primary Emerald Button).

---

# Invoice Adjustment

This is exactly how enterprise accounting software (like Stripe, Xero, or QuickBooks) handles post-issuance modifications.

In accounting, there is a strict difference between **Editing** (freely changing a draft before anyone sees it) and **Adjusting** (modifying a live ledger document that a client already possesses).

Here is the architectural plan to safely implement the **"Invoice Adjustment Workflow."**

---

### PHASE 1: The UX Paradigm (Edit vs. Adjust)

We must visually separate these two actions so the accountant understands the gravity of what they are doing.

- **Draft Mode (`/edit`)**: Full freedom. The user can add/remove cases, change prices, and alter the clinic. The UI is the full 70/30 split-screen.
- **Live Mode (`?action=adjust`)**: Restricted freedom. The user opens a **"Ledger Adjustment Sheet"** directly over the Invoice Dossier. The UI is clearly marked with warning colors (e.g., Amber), and the core financial building blocks (the cases attached) are physically locked.

---

### PHASE 2: The Status-Based Lockout Matrix

What the user is allowed to adjust depends entirely on the `InvoiceStatus`. We must enforce this both in the UI and the Server Action.

**1. Status: `SENT` or `OVERDUE` (Unpaid but Live)**

- _Locked:_ The Clinic, the specific cases attached, and the snapshot prices. (If they need to remove a case, they must void the invoice and issue a new one).
- _Adjustable:_
    - **Due Date:** (e.g., Giving the clinic a 15-day extension).
    - **Ledger Discount:** (e.g., A doctor complains about a bill, so the manager applies a retroactive 10% "Apology Discount" to smooth things over).
    - **Public/Internal Notes:** Updating the memo shown on the PDF.

**2. Status: `PARTIAL` or `PAID` (Cash has moved)**

- _Locked:_ **ALL Financials.** You cannot change a discount or a total once money has changed hands. That breaks fundamental accounting rules.
- _Adjustable:_
    - **Internal Notes Only:** (e.g., "Doctor promised to pay the rest next month").

**3. Status: `CANCELLED` (Voided)**

- _Locked:_ **Everything.** A cancelled invoice is a tombstone record.

---

### PHASE 3: The UI Architecture

To keep the application feeling like a fast "Command Center," we won't redirect them to the massive `/edit` page.

**1. The Trigger:**
In the `InvoiceDossierClient` header, the "Edit Statement" button becomes "Adjust Statement" if `status !== DRAFT`.

**2. The UI Component (`InvoiceAdjustmentSheet`):**
A slide-over sheet (similar to `RecordPaymentSheet`) that opens over the Dossier.

- **Top Alert:** An amber warning banner: _"You are modifying a live statement. Changes to financials will immediately reflect on the clinic's public link."_
- **Read-Only Vitals:** Displays the Invoice #, Total, and Cases count as locked gray text.
- **The Inputs:** Renders only the fields allowed by the Lockout Matrix (e.g., Date Picker for Due Date, Number Input for Discount).

---

### PHASE 4: Database & Security Integrity

When the user clicks "Save Adjustments," the Server Action (`adjustLiveInvoiceAction`) must be bulletproof.

1.  **Security Guard:** Verify the user is a `MANAGER` or `ACCOUNTANT`.
2.  **State Guard:** Re-verify the invoice status in the DB. If they try to apply a discount, but a receptionist just logged a full payment 5 seconds ago, the action must abort and throw an `OPERATION_NOT_ALLOWED` error.
3.  **Financial Recalculation:** If a discount is added, the server must dynamically recalculate `amountDue` based on the _original_ subtotal minus the _new_ discount, ensuring it accounts for any `amountPaid` already logged.

---

### The Business Value Add

By introducing this "Adjust" flow, you prevent the lab staff from having to manually cancel and recreate entire invoices just because a doctor asked for a 5-day extension or a 5% courtesy discount. It keeps your ledger clean while offering enterprise flexibility.

**Do you agree with this Lockout Matrix and Sheet-based UI approach?** If so, we can begin detailing the schemas and components.
