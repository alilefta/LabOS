The **Financial Dossier** (`/invoices/[invoiceId]`) is the ultimate tool for accounts receivable.

When an accountant or lab owner opens this page, they are in a **"Reconciliation and Audit"** mindset. They need to answer: _Have they paid us? If partially, how much is left? What cases are on this bill, and who worked on them?_

To match our high-end **"Clinical Glass & Neon Precision"** standards, we must move away from a basic table list and treat this page as an **Interactive Ledger Sheet** [s1].

---

### PHASE 1: The Visual Layout (70/30 Split-Screen)

We will maintain consistency across LabOS by using our **70/30 Split-Screen Workspace**, utilizing the `max-w-[2000px] mx-auto` boundary with independent scrolling [2, s1].

- **The Left Pane (70%): The Digital Bill (Scrollable)**
    - This is designed to look like a physical, beautifully printed invoice sheet with clean vertical lines, monospace numbers, and a perforated top border.
    - **Section 1: Lab & Clinic Metadata:** Professional brand headers (your Lab’s logo) contrasted against the Clinic’s shipping/billing address.
    - **Section 2: Billed Case Line Items:** A clean, high-density table. Each row is a Case. Clicking a row navigates to the `/cases/[caseId]` dossier.
        - _UX Detail:_ It displays the Patient Name, Case ID, Products, and the **snapshotted `caseTotal`** from the `InvoiceCase` table (crucial for financial audits!).
    - **Section 3: The Receipt Footer:** Subtotal, Applied Discount + Reason, Grand Total, Amount Paid, and the Remaining Balance.
- **The Right Pane (30%): The Accounting Sidebar (Sticky)**
    - This is the transactional action hub. It stays pinned as the user scrolls down the long list of cases on the left.
    - **Card 1: Payment Status & Debt Gauge:** A large, circular visual progress ring showing how much has been paid (e.g., 60% Paid) [3].
    - **Card 2: Transaction Timeline:** A vertical history of all `InvoicePayment` receipts logged against this invoice (Date, Method, Reference ID, Amount, Notes). If empty, shows a clean fallback.
    - **Card 3: Statement Sharing:** Houses the dynamic public token link and a 1-click WhatsApp button to re-send the invoice.
    - **Action Bar:** A prominent, glowing Emerald **"Record Payment"** button (which launches our `RecordPaymentSheet`) and a secondary **"Download PDF"** button.

---

### PHASE 2: The Logical Workflow (Step-by-Step)

1.  **Server Hydration:** The page server component fetches the complete `Invoice` by ID, including `clinic`, `cases` (with `patient`, `dentist`), and `payments`.
    - _Security Guard:_ Scoped strictly by `labId`.
2.  **Interactive Reconciliation:** The accountant clicks "Record Payment" in the right sidebar. The `RecordPaymentSheet` slides out.
3.  **The Live Update (The Handshake):** Once they log a payment (e.g., $1,500 Bank Transfer), the Sheet closes, TanStack Query invalidates the `["invoice-details", invoiceId]` cache, and **the entire page instantly re-calculates**:
    - The Outstanding Balance drops.
    - The Status Badge transitions from `PARTIAL` to `PAID`.
    - A new payment dot is instantly rendered on the right pane's Transaction Timeline.

---

### PHASE 3: Database & Security Invariance Rules

To keep the lab's financial ledger 100% secure, the page and its server actions must enforce these strict business rules:

1.  **The "Paid Lock" Rule:** If `status === "PAID"`, the "Record Payment" button must be completely disabled in the UI. You cannot apply payments to a settled ledger.
2.  **The "Void" Rule:** If an invoice is `CANCELLED`, all actions are disabled, and a large diagonal watermarked "VOID" text is overlaid across the left pane's digital bill.
3.  **Case Release on Cancel:** If an invoice is voided/cancelled, the related cases must be released from the `InvoiceCase` table so they return to the "Unbilled Queue" and can be billed on a future invoice. This is a critical database transaction safety check.

---

### PHASE 4: Creative/Awwwards-Level Touches

- **The "Holographic Paid Seal":** When an invoice status hits `PAID`, a beautiful, rotated, glowing Emerald circular badge overlay (like a physical wax stamp) animates into the top-right corner of the digital bill with a smooth scale-in transition.
- **The "Aging" Indicator:** If an invoice is unpaid and past its `dueDate`, we show an **"Aging Counter"** next to the past-due badge (e.g., `OVERDUE • 14 Days Aging`).
- **Print-Media Override:** We configure the page so that pressing `Cmd+P` (or clicking Print) automatically hides the entire right-side sidebar, the header, and any "Pay" buttons, printing _only_ the beautiful, clean Left Pane ledger.

---

**Does this architectural plan and UX journey for the Financial Dossier satisfy your requirements?**

If yes, we can begin building. Let's start by laying down the Server Hydration code and the DTOs!
