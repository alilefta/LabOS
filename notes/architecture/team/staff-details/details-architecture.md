The **Staff Dossier (`/team/[staffId]`)** is the ultimate HR and Operations checkpoint.

When a Lab Manager opens this page, they are either:

1.  **Auditing Quality:** _"Why did Julian have 4 remakes this week?"_
2.  **Balancing Load:** _"Ahmed is sick today. I need to reassign his active cases."_
3.  **Managing Access:** _"Elena forgot her password, or I need to promote her to Senior Tech."_

This page must transition seamlessly between **Administrative Settings** and **Active Production Reality.**

Here is the "Awwwards-Level" ERP Architecture Plan for the Staff Dossier.

---

### PHASE 1: The Layout Architecture (The 30/70 Split)

Unlike the Case Dossier where the "Action" is on the right, here the **Human Identity** anchors the page on the left, and the **Data** flows on the right.

- **The Command Header:**
    - _Context:_ Breadcrumbs (`Team > Elena Vance`).
    - _Status:_ A glowing badge indicating System Access (`ACTIVE_USER`, `NO_ACCESS`).
    - _Actions:_ `[Deactivate Employee]` (Danger), `[Edit Profile]`.
- **The Left Pane (30% - The HR File):**
    - A sticky column focusing on identity, contact info, and role configuration.
- **The Right Pane (70% - The Workbench):**
    - A scrollable canvas divided by Tabs (`Active Workload`, `Historical Performance`, `System Security`).

---

### PHASE 2: Component Breakdown & UX Strategy

#### 1. The Left Pane: `StaffIdentityCard`

- **Visuals:** A large, high-res Avatar overlapping a colored banner. The banner color is driven by their `roleCategory` (e.g., Blue for Technicians, Amber for Couriers).
- **Vitals:** Phone, Address (critical for couriers), Job Title.
- **Compensation Snapshot:** (Hidden if `canViewFinancials` is false). A subtle gray box showing their commission structure (e.g., "Pays $15.00 per unit").

#### 2. The Right Pane: Tab 1 — `ActiveWorkbench` (The Operational View)

This is the default tab. It shows what the employee is doing _right now_.

- **The Capacity Gauge:** A large visual progress bar (e.g., `8 / 15 Cases Assigned`).
- **The Active Cases Table:** A virtualized TanStack table.
    - _Data:_ Only fetches cases where `status` is `ASSIGNED` or `PROCESSING`, and this `staffId` is linked.
    - _UX Magic (Bulk Reassignment):_ Checkboxes next to each row. A "Reassign Selected" floating footer allows the manager to instantly move 5 cases from Ahmed to Julian with one click.

#### 3. The Right Pane: Tab 2 — `HistoricalPerformance` (The Audit View)

- **The Vitals Grid:**
    - Total Lifetime Cases.
    - Average Turnaround Time (e.g., 2.4 days).
    - **Remake Rate:** Prominently displayed.
- **The Recent Activity Timeline:** Reusing your existing `AuditTrailLog` component, but filtered to _only_ show events where this specific `staffId` was the `actorId` or the subject.

#### 4. The Right Pane: Tab 3 — `SystemSecurity` (The IT View)

- This tab only renders if the employee has (or is eligible for) software access.
- **State A (No Access):** A "Grant Access" button that triggers the Better-Auth invitation flow.
- **State B (Pending):** Shows the generated invite link with a "Copy to Clipboard" button and "Resend Email."
- **State C (Active User):** Shows their `AuthUserRole` (Admin vs Lab User), Last Login Date, and a "Force Password Reset" or "Revoke Access" button.

---

### PHASE 3: Database & Security Invariance Rules

To keep the database clean and secure, the Server Actions for this page must enforce strict rules:

1.  **The Reassignment Transaction:** If the manager reassigns 3 cases from Ahmed to Julian, the backend must use a `$transaction` to:
    - Delete the `CaseStaffAssignment` for Ahmed on those 3 cases.
    - Create new `CaseStaffAssignment` records for Julian, ensuring his specific `commissionValue` is snapshotted at that exact moment.
    - Generate 3 `CaseActivityLog` entries ("Cases reassigned from Ahmed to Julian by Admin").
2.  **Deactivation Lockout:** If a manager clicks `[Deactivate Employee]`, the system must check if `ActiveCaseCount > 0`. If true, it blocks the deactivation and forces the manager to reassign the work first. You cannot have active cases assigned to ghosts.
3.  **Role Escapism Prevention:** Only users with `OWNER` or `ADMIN` roles can modify the `SystemSecurity` tab. A standard manager can reassign cases, but they cannot grant someone system access.

---

### The "Awwwards" Value Proposition

Standard HR software treats employees as static records. LabOS treats them as **Operational Nodes**. By merging the HR file (phone numbers, titles) with the Active Workbench (live cases, bulk reassignment tools), you save a lab manager hours of digging through different screens to figure out who is working on what.
