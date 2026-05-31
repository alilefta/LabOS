The **Ledger Tab (`StaffPayrollTab`)** is the final and most sensitive component of the Team Dossier.

In a dental lab, technicians are frequently paid on a **hybrid model**: a base salary plus a commission per unit (e.g., "$15 per Zirconia crown") or a percentage of the total case value.

The goal of this tab is to transition from _Clinical Operations_ into _Human Resources & Payroll_. It needs to feel like an incredibly secure, precise **Banking Terminal**.

Here is the "Awwwards-Level" Architecture Plan for the **Payroll Ledger Tab**.

---

### PHASE 1: The Visual Layout (The Financial Terminal)

We will use a **1-Column Stacked Architecture** with high-density components, entirely styled in the `Emerald` (Financial) color palette to reinforce the context shift.

**Zone A: The Compensation Vitals (Top Strip)**
A 3-card horizontal grid summarizing the technician’s earnings.

- **Card 1:** `Current Commission Rate` (e.g., "15% per Case" or "$25 Flat Fee").
- **Card 2:** `Pending Unpaid Commissions` (Money they have earned but not yet been paid out).
- **Card 3:** `YTD Earnings` (Total compensation logged for the year).

**Zone B: The "Pending Payout" Action Hub**
A sticky-styled action bar. If the technician has "Pending Unpaid Commissions", a glowing primary button appears: `[ Generate Commission Payout ]`. This calculates exactly what is owed right now.

**Zone C: The Payout History (The Ledger Table)**
A virtualized TanStack table logging every historical paycheck generated for this employee.

---

### PHASE 2: Component Breakdown & Interactions

#### 1. Component: `StaffCompensationVitals`

- **Role:** Displays the high-level financial health and current compensation structure of the employee.
- **UX Magic:** If the `commissionType` is `PERCENTAGE`, it explicitly displays: _"Technician receives X% of the Grand Total of cases they are assigned to upon completion."_

#### 2. Component: `PendingCommissionsQueue` (The Cart)

- **Role:** An accordion or card listing the **specific cases** that the technician has finished, but hasn't been paid for yet.
- **Interaction:**
    - Lists cases where `CaseStaffAssignment.isPaid === false` and `Case.status === COMPLETED | DELIVERED`.
    - The manager can see exactly _why_ Ahmed is owed $450 this week (e.g., 30 units at $15/unit).

#### 3. Component: `PayrollLedgerTable`

- **Role:** The historical record.
- **Columns:**
    - `Payout ID` (Monospace).
    - `Date Processed`.
    - `Cases Included` (e.g., "14 Cases").
    - `Total Paid` (Monospace, Emerald).
- **Action:** Hovering over a row shows a `[ Download PDF Receipt ]` button to give the employee a paystub.

---

### PHASE 3: The "Record Payout" Workflow (The Engine)

This is the most critical backend action. When the manager clicks `[ Generate Commission Payout ]`:

1.  **The Modal (`RecordPayoutSheet`):** A slide-over appears summarizing the pending cases and calculating the total owed. The manager confirms the payout method (e.g., "Direct Deposit").
2.  **The Atomic Server Action:**
    - Find all `CaseStaffAssignment` records for this `staffId` where `isPaid = false`.
    - Use a Prisma `$transaction` to:
        - Calculate the total owed.
        - Update those `CaseStaffAssignment` records to `isPaid = true` and set `paidAt = new Date()`.
        - Generate a `StaffPayout` record (a new model, or just rely on the updated assignments for history).
3.  **The Cache Invalidation:** The sheet closes, the TanStack query refetches, and the "Pending Unpaid Commissions" vital card drops instantly to `$0.00`.

---

### PHASE 4: Database & Security Considerations

- **Strict Role Guarding:** This entire tab must be guarded by `canViewFinancials`. A standard `TECHNICIAN` can view their _own_ dossier to see their cases, but they should never see the `Ledger` tab.
- **Immutable Historical Logic:** In your schema, you brilliantly saved `commissionType` and `commissionValue` inside the `CaseStaffAssignment` itself. This means if a technician gets a raise from $15/unit to $20/unit today, the cases they finished yesterday will still calculate at $15/unit!

---

**Does this "Banking Terminal" architecture align with your vision for the Payroll tab?**
If so, we can begin building. No code yet, just let me know if you are ready to proceed with Phase 1!

This is the perfect way to execute a complex feature. By breaking the **Payroll Ledger Tab** into logical, testable sprints, we guarantee that the math is flawless before we build the UI, and the UI is flawless before we build the interactions.

Here is the **Sprint Execution Plan** for the `/team/[staffId]?tab=payroll` route.

---

### SPRINT 1: The Financial Data Access Layer (DAF)

_Before drawing a single pixel, the backend must be able to securely calculate what an employee is owed based on your `CaseStaffAssignment` snapshot model._

**Objectives:**

1.  **Author `getStaffPayrollVitalsAction`**:
    - Query 1: Sum the `commissionTotal` of all `CaseStaffAssignment` records where `isPaid = false` and the related Case is `COMPLETED` or `DELIVERED` (This is the **Pending Debt**).
    - Query 2: Sum the `commissionTotal` where `isPaid = true` within the current year (This is the **YTD Earnings**).
2.  **Author `getPendingCommissionsAction`**:
    - Fetch the actual line-item cases that make up the "Pending Debt" so the manager can review them before issuing a payout.

---

### SPRINT 2: The "Banking Terminal" Client Shell

_Building the visual framework and the high-level metrics._

**Objectives:**

1.  **Build `StaffPayrollTabContent`**: The Client Component that houses the TanStack `useQuery` to fetch the Vitals and injects them into the UI.
2.  **Build `StaffCompensationVitals` (Zone A)**:
    - The 3-card Bento grid displaying _Current Rate_, _Pending Payout_, and _YTD Earnings_.
    - Utilize the `Emerald` financial color scheme and `font-mono` typography.
3.  **Build `PendingCommissionsQueue` (Zone B)**:
    - A clean, scrollable list showing the specific cases awaiting payout.
    - _UX Detail:_ Include a glowing primary button: `[ Review & Issue Payout ]`.

---

### SPRINT 3: The Payout Execution Engine (The Handshake)

_The critical step where the Lab Manager actually pays the employee and settles the ledger._

**Objectives:**

1.  **Author `issueStaffPayoutAction` (Server Action)**:
    - The atomic Prisma `$transaction` that takes an array of `CaseStaffAssignment` IDs, verifies they are unpaid, sets `isPaid = true`, and stamps `paidAt = new Date()`.
2.  **Build `RecordPayoutSheet` (Client Modal)**:
    - A slide-over that summarizes the pending cases.
    - Allows the manager to select the payment method (e.g., Bank Transfer, Cash).
    - Executes the Server Action and immediately invalidates the TanStack cache so the "Pending Payout" card drops to `$0.00`.

---

### SPRINT 4: The Historical Ledger Table

_The audit trail for the accountant and the employee._

**Objectives:**

1.  **Author `getStaffPayoutHistoryAction`**:
    - Because we don't have a dedicated `StaffPayout` table in the schema, we will group `CaseStaffAssignment` records by their `paidAt` date (ignoring the time) to simulate a "Paystub" or "Batch Payout" record.
2.  **Build `PayrollLedgerTable` (Zone C)**:
    - A virtualized TanStack table listing historical payouts.
    - _Columns:_ Payout Date, Cases Included, Total Paid, Status (Always "Settled").
    - _Row Action:_ `[ Download Paystub PDF ]`.

---

### SPRINT 5: The PDF Paystub Generator (The "Awwwards" Polish)

_Giving the employee a beautiful, physical receipt for their commissions._

**Objectives:**

1.  **Create `/app/(public)/paystub/[staffId]/[date]` Route**:
    - An unauthenticated (but secure) route that renders the specific batch of paid cases.
2.  **Apply `@media print` CSS**:
    - Format the page to render perfectly as an A4 document when the manager clicks `Cmd+P` or "Download PDF".

---

**Does this Sprint Plan give us the structural safety we need?**
If you approve, we will begin writing the code for **Sprint 1: The Financial Data Access Layer**. Just say the word!

---

---

---

### SPRINT 2 In Details: The "Banking Terminal" Client Shell (Planning & Architecture)

In this sprint, we build the visual framework for the payroll ledger. We are transitioning the user's mental model into an **Accounts Payable (A/P)** context. To do this, we will use the **Emerald** (Financial) color palette and **JetBrains Mono** typography to give the tab the authority of a banking app.

Here is the detailed architectural plan for the components in Sprint 2.

---

### Component 1: `StaffPayrollTabContent` (The Client Orchestrator)

- **Type:** Client Component.
- **Role:** The parent container. It connects to TanStack Query to load the prefetched datasets:
    1.  `useQuery(["staff-payroll-vitals", staffId])`
    2.  `useQuery(["pending-commissions", staffId])`
- **UX Performance:** Because we prefetched these on the server, **they will resolve in `0ms` on mount**, completely eliminating any layout flicker.
- **Layout:** A vertical stack. Zone A (The 3 Vitals Cards) sits at the top, followed by Zone B (The Pending Queue) below it.

---

### Component 2: `StaffCompensationVitals` (Zone A)

A horizontal, responsive grid (`grid-cols-1 md:grid-cols-3`) displaying the financial summary.

- **Card 1: Compensation Basis (The Contract)**
    - _Purpose:_ Displays _how_ this employee is paid.
    - _Visuals:_ A scale or briefcase icon in emerald green.
    - _The Copy:_ If `commissionType === "PERCENTAGE"`, it shows `X% per Case` in large, bold font. If `FIXED`, it shows `$X.XX Flat` per unit. Includes a sub-badge explaining their active structure.
- **Card 2: Pending Unpaid (The Lab's Liability)**
    - _Purpose:_ Shows exactly how much money the employee has earned but hasn't been paid for yet.
    - _Visuals:_ An alert/wallet icon. The dollar amount is rendered in massive `font-mono text-3xl font-black text-foreground`.
    - _The Magic:_ If the balance is $>0$, a glowing badge appears showing the active case count (e.g., `14 Cases Pending Payout` in pulsing emerald).
- **Card 3: YTD Earnings (The Success Metric)**
    - _Purpose:_ Shows their total accumulated earnings for the year.
    - _Visuals:_ A trending-up icon. Displays the total in bold green monospace text.

---

### Component 3: `PendingCommissionsQueue` (Zone B)

This is the "Pending Ledger." It acts as a detailed receipt, showing the manager exactly _which_ completed cases make up the pending payout total before they authorize a bank transfer.

- **The Header (The Action Bar):**
    - _Left:_ "Pending Payout" title, with a badge showing the case count.
    - _Right:_ A prominent, glowing emerald **`[ Review & Issue Payout ]`** button. Clicking this will eventually launch the `RecordPayoutSheet` in Sprint 3. (It will be disabled if `totalPending === 0`).
- **The Case Rows (The Line Items):**
    - A vertically scrolling list of the unbilled cases.
    - Each row represents a `CaseStaffAssignment` and displays:
        - _Case Reference:_ `caseNumber` (bold primary monospace, e.g., `#LAB-4492`).
        - _Patient:_ `patientName` (clinical context).
        - _Case Value:_ `caseTotal` (monospace).
        - _Commission Earned:_ `commissionTotal` (bold green monospace, e.g., `+$45.00`).
        - _Completion Date:_ Formatted date.

---

### Why this design delivers Peak UX:

1.  **Mathematical Transparency:** In a manual lab, employees constantly argue about their paychecks ("I made 5 crowns last week, why am I only paid for 4?"). By listing the exact cases inside the `PendingCommissionsQueue`, there is **100% transparency**. Both the manager and the tech see the exact same transaction logs.
2.  **No Extraneous Database Calls:** Because we calculated the totals on the server in Sprint 1, the client component doesn't have to map-and-sum the cases to show the totals. It just renders `totalPending` directly, keeping the UI light.
3.  **Financial Immersion:** Every currency value on this page is locked to `JetBrains Mono` and aligned right. This allows the human eye to scan columns of numbers with absolute ease, instantly matching the visual standard of professional accounting suites.

**Do you approve of this Client Shell architecture?**

If yes, we are ready to write the code for the **`StaffPayrollTabContent`** and **`StaffCompensationVitals`** to kick off the frontend implementation of Sprint 2!
