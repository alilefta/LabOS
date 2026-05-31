The **Work Settings Tab (`StaffSettingsTab`)** is the final component of the Staff Dossier.

While the other tabs focus on _daily operations_ (Cases) and _payouts_ (Payroll), this tab is the **"Control Panel"** for the employee's relationship with the lab. It is where you manage their **Identity, Compensation Defaults, IT Security, and Work Schedule.**

To maintain the "Clinical Glass & Neon Precision" aesthetic, we will structure this tab as a **Vertical Stack of High-Density Bento Cards**, utilizing your custom form inputs.

---

### PHASE 1: The Layout Architecture (The Settings Stack)

We will group the settings into four distinct, semantic cards to reduce cognitive load. Each card represents a different "Department" of the employee's file:

#### 1. Card 1: Identity & Departmental Role (HR Group)

- **Purpose:** Edits their basic public profile and operational categorization.
- **Fields:** First Name, Last Name, Job Title, Specialization (e.g., "Full Arch Cosmetics"), and `StaffRoleCategory` (Technician, Courier, QC Inspector).
- **Employment Status Toggle:** A clean Switch: _"Active Employment Status"_.
    - _UX Rule:_ If toggled off, the system runs the **Deactivation Check** we planned. If they have active cases, it blocks them and says: _"You must reassign their 12 active cases before deactivating."_

#### 2. Card 2: Default Compensation (Finance Group - Emerald Theme)

- **Purpose:** Sets their default pay structure for future cases.
- **Fields:** `CommissionType` (Percentage vs. Fixed) and `CommissionValue` (e.g., 15% or $25.00).
- **UX Copy:** A sub-text explaining the snapshot rule: _"Changes to default commission will only apply to future case assignments. Active and historical case payroll logs remain unaffected."_

#### 3. Card 3: Software Access & Security (IT Group - AI/Violet Theme)

This is the **"Software Seat"** manager. It dynamically morphs based on their current `accessState`.

- **State A (No Access):** Displays a gray card: _"Drill-down to Grant System Access."_ Clicking it launches the `RegisterStaffSheet` flow.
- **State B (Pending Invite):** Displays the pending email, the role to grant, and a copyable **"Onboarding Link"** with clipboard integration, plus a `[Resend Invitation]` button.
- **State C (Active User):** Displays their `authUser.email` (Read-only), their current `LabRole` (Admin, Manager, Staff), a `[Reset Password]` action, and a red `[Revoke System Access]` action (which deletes the `LabUser` record but keeps their `LabStaff` payroll history safe).

#### 4. Card 4: Operating Schedule (Operations Group)

- **Purpose:** To feed the lab’s auto-assignment engine.
- **Fields:** Simple weekday checkboxes (Mon-Fri) and active working hours.
- **Why it's elite:** If a case has a tight 24-hour deadline on a Tuesday, the LabOS auto-router checks this schedule and will _never_ assign it to a ceramist who is marked as "off-duty" on Tuesdays.

---

### PHASE 2: State Management & Saving Strategy

To ensure a smooth, zero-latency user experience:

1.  **Form Scope:** We initialize a local React Hook Form instance specifically for this tab.
2.  **Atomic Save per Card:** Instead of one giant "Save" button at the bottom of the page, **each card has its own inline `[Save Section]` button**. This is much more intuitive for settings (e.g., if a user just wants to change a phone number, they don't want to re-validate the entire billing section).
3.  **The "Dirty" Handshake:** The inline "Save" button for each card remains disabled/gray until a field inside _that specific card_ is changed, keeping the UI completely clean.

---

### Summary of the Value Proposition:

By treating "Software Seats" (Logins) as a sub-setting of "The Human" (LabStaff), and linking their "Work Schedule" directly to the auto-assignment engine, the Work Settings tab cements LabOS as a fully integrated B2B Operating System, rather than just an admin panel.

**Do you approve of this 4-Card Settings Stack architecture?**

If yes, we have successfully designed the blueprints for the entire **Team Module**. Let me know if you are ready to start coding!

---

---

---

# Sprints

To ensure 100% database integrity and a flawless 120 FPS user experience, we must divide this complex settings page into **3 highly focused, progressive sprints**.

By tackling one logical domain at a time, we can strictly test the Server Actions, Zod validation schemas, and UI transitions before linking them together.

Here is the **3-Sprint Implementation Roadmap** for the `StaffSettingsTab`.

---

### SPRINT 1: Roster Identity & Availability (The "Human" Foundation)

_Focus: Managing the employee’s physical/operational profile and weekly schedule._

- **Step 1: The Database Action (`updateStaffIdentityAction`)**
    - Write the server action to update `firstName`, `lastName`, `jobTitle`, `specialization`, and `roleCategory`.
    - _Security Guard:_ Ensure the action checks the active user's role (must be `OWNER` or `MANAGER`).
- **Step 2: The Deactivation Lockout**
    - In the database logic, check if `activeCaseCount > 0` before allowing `isActive` to be set to `false`. Throw a custom error if they have active work.
- **Step 3: The UI Cards**
    - Build the `StaffIdentityCard` (Name, Title, Category dropdown) using your `CustomFieldWithLabel` pattern.
    - Build the `StaffScheduleCard` (Mon-Fri checkboxes).
- **Success Criteria:** An administrator can successfully edit an employee's name, toggle their work days, and try (and fail) to deactivate a technician with 5 active cases in their queue.

---

### SPRINT 2: The Economic Blueprint (Compensation Defaults)

_Focus: Setting up how the employee is paid for future production._

- **Step 2.1: The Database Action (`updateStaffCompensationAction`)**
    - Write the server action to update `commissionType` and `commissionValue` in the `LabStaff` model.
    - _The Financial Guard:_ Only allow owners (`OWNER`) to read or write to this action.
- **Step 2.2: The UI Card (`StaffCompensationCard`)**
    - Build the card utilizing the **Emerald Financial Theme**.
    - Implement the segmented toggle (`PERCENTAGE` vs `FIXED`) and the custom number inputs using `InputWithLabel`.
- **Success Criteria:** Changing a ceramist's default rate from $15 to $20 is securely saved in the database, and the card's "Save Changes" button behaves reactively (disabled until dirty).

---

### SPRINT 3: The IT Security Gateway (System Access)

_Focus: Managing their credentials, active logins, and invites. This is the most complex step because it touches Better-Auth, LabUser, and LabInvitation._

- **Step 3.1: The Security Actions**
    - `grantStaffSystemAccessAction`: Generates a `LabInvitation` with a secure token, sends the email, and returns the token to the client.
    - `revokeStaffSystemAccessAction`: Deletes the `LabUser` record and active sessions, but preserves the `LabStaff` record to protect historical case audits.
- **Step 3.2: The Dynamic UI Card (`StaffSecurityCard`)**
    - Build the card using the **AI/Violet Theme**.
    - Implement the 3-state morphing logic (Active User / Pending / No Access).
    - Add the "Copy Invitation Link" clipboard interaction.
- **Success Criteria:** Clicking "Grant Access" immediately emails an invite, changes the card to "Pending Invite" with a copyable link, and clicking "Revoke Access" instantly deletes the login seat without breaking past cases.

---

**Do you agree with this Sprint breakdown?**

If so, let's execute **Sprint 1 (Roster Identity & Availability)**! I am ready to write the code for the first set of components whenever you are.
