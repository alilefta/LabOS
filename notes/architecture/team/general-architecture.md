## /Team Route

Moving to the `/team` route shifts the software from a "Financial Ledger" into a **"Human Resources & Operations Hub."**

Dental labs live and die by the efficiency and quality of their technicians. This page must answer three critical questions for the Lab Manager:

1.  **"Who is on my team?"** (Roster & Roles)
2.  **"What are they working on right now?"** (Active Workload & Capacity)
3.  **"How good are they?"** (Performance & Remake Rate)

_Note: Payroll/Commissions are handled in the separate `/payroll` route to protect sensitive financial data._

Here is the "Awwwards-Level" ERP Architecture Plan for the `/team` route, enforcing the `max-w-[2000px]` boundary.

---

### PART 1: The Global Layout & Shell (`/app/(main)/team/page.tsx`)

We will use a **Command Header + Bento Grid Workspace**, steering away from a basic table view.

- **Zone A: The HR Command Header**
    - _Context:_ "Production Team & Staff"
    - _Actions:_ `[+ Onboard Staff Member]` (Primary), `[Export Activity Log]` (Ghost).
    - _Role Filter:_ A segmented control or pill list (`All`, `Ceramists`, `Inspectors`, `Couriers`, `Admin`) to quickly isolate departments.
- **Zone B: The Workforce Pulse (Top Strip)**
    - 3-4 high-impact metric cards:
        1.  **Total Active Staff:** (e.g., 24).
        2.  **Current Floor Capacity:** An aggregated bar (e.g., "Lab is at 82% utilization").
        3.  **Overall Lab Turnaround:** (e.g., 3.2 Days Average).

---

### PART 2: The Core View (The "Staff Grid")

Instead of a boring list, we will display the staff using **"Operational Playing Cards."**

#### The Component: `StaffMemberCard.tsx`

- **Visual Structure:** A vertical card (`min-h-[280px]`).
- **Header (Identity):**
    - Large, circular Avatar breaking out slightly from a colored top banner.
    - `firstName lastName` and their specific `jobTitle` (e.g., "Senior Ceramist").
- **The "Role" Badge:**
    - A color-coded badge based on `roleCategory`. (e.g., `TECHNICIAN` = Blue, `QC_INSPECTOR` = Violet, `COURIER` = Amber).
- **The "Live Capacity" Bar (The Killer UX Feature):**
    - A horizontal progress bar showing their _Active Assigned Cases_.
    - _Logic:_ If Ahmed is assigned to 12 cases in `PROCESSING`, the bar might be 90% full and turn Amber/Red to signal "Burnout Risk." If Julian has 2 cases, his bar is Green ("Available for Work").
- **The Quality Score (Optional):**
    - A small sparkline or percentage showing their personal "Remake Rate" over the last 30 days.
- **Interaction:** Clicking the card routes the user to the Staff Dossier (`/team/[staffId]`).

---

### PART 3: The Data Fetching Strategy (Server + Client)

To handle labs with large teams (e.g., 50+ staff), we must avoid N+1 queries when calculating the "Live Capacity" bar.

**The Server Action (`getStaffRosterAction`)**

```typescript
const staff = await prisma.labStaff.findMany({
	where: { labId, isActive: true },
	include: {
		// N+1 Prevention: We only count cases that are currently active!
		_count: {
			select: {
				caseAssignments: {
					where: { case: { status: { in: ["ASSIGNED", "PROCESSING"] } } },
				},
			},
		},
	},
});
```

By using `_count` with a `where` clause inside the relation, the database calculates the active workload for every employee in a single, lightning-fast SQL query.

---

### PART 4: The Staff Dossier (`/team/[staffId]`)

When the manager clicks a `StaffMemberCard`, they enter the deep-dive view for that employee. We reuse the **70/30 Split-Screen Canvas** (`max-w-[2000px]`).

#### The Left Pane (70%): "The Workbench"

- **Active Assignments Table:** A data table showing exactly which cases this technician is currently working on.
    - _Columns:_ Case ID, Product, Due Date, Status.
    - _Action:_ "Reassign Case" (If the tech calls in sick, the manager can transfer the case to someone else).
- **Recent Activity Log:** A filtered version of your `CaseActivityLog` showing _only_ events where this `staffId` was the actor (e.g., "Ahmed moved Case #102 to QC Passed").

#### The Right Pane (30%): "The HR Profile"

- **Profile Identity:** Contact info, Address (crucial for couriers), and System Access level (`LabRole`).
- **Performance Vitals:**
    - _Speed:_ Average days to complete a case.
    - _Quality:_ Lifetime Remake Rate.
- **Action Hub:** `[Edit Profile]`, `[Suspend Account]`, `[Reset Password]`.

---

### The "Awwwards" Value Proposition

By adding the **"Live Capacity Bar"** to the Staff Cards, the `/team` page isn't just a list of names—it becomes a **Load Balancing Tool**. A manager can open the page, instantly spot that the "Ceramics" team is in the red (overworked) while the "Prep" team is in the green, and reassign cases accordingly.

---

# Q/A

## Q1

Does this /team manage the people who get cases or the Lab Users users who can sign in to the system or both?
This is the most critical architectural crossroad in your schema. You are asking: **"Does `/team` manage the Human Beings (Workers), the Software Seats (Logins), or both?"**

Based on the highly advanced schema you built:

```prisma
model LabUser {
  id         String @id // The Login Seat (Admin, Owner, Staff)
  labStaffId String?    // THE LINK to the Human
  labStaff   LabStaff?
}

model LabStaff {
  id           String @id // The Human Worker (Ceramist, Courier)
  roleCategory StaffRoleCategory
}
```

The answer is: **The `/team` route must manage BOTH, but unified under the concept of "The Human."**

If you split them into two different pages (e.g., `/settings/users` vs `/team/workers`), it creates a fragmented, confusing nightmare for the Lab Owner. ("I fired Ahmed. Why can he still log in? Oh, I deleted his Worker profile, but forgot to delete his User account in settings!").

Here is the **Unified Team Architecture** that solves this elegantly.

---

### The Strategy: "The Unified Identity"

The `/team` route views the world through the lens of the **`LabStaff` (The Human)**.
System Access (`LabUser`) is simply treated as a **Toggle/Setting** attached to that human.

#### 1. The Roster Grid (The Main View)

When looking at the grid of `StaffMemberCard`s, you show the human's operational role.

- **The UX Magic:** Add a small "Key" or "Shield" icon badge to the card _only_ if `labUser !== null`.
- _Translation:_ The Lab Owner can instantly scan the room and see: "I have 20 technicians. These 5 have login access to the software. The other 15 just work at their benches."

#### 2. The Onboarding Flow (`RegisterStaffSheet`)

When clicking `[+ Onboard Staff Member]`, the form must handle both entities cleanly.

- **Step 1 (The Human):** Name, Phone, Job Title, Role Category (e.g., `TECHNICIAN`).
- **Step 2 (The Access Toggle):** A large switch: _"Grant Software Access?"_
    - _If OFF:_ You only create a `LabStaff` record. (Perfect for a courier who doesn't need an app account).
    - _If ON:_ The form expands to ask for an `Email` and an `Access Level` (Admin vs Staff). The Server Action creates the `LabStaff` record **AND** sends an email invitation via Better-Auth to create the `AuthUser`/`LabUser`, linking them automatically.

#### 3. The Staff Dossier (`/team/[staffId]`)

Inside the 30% Right Pane (The HR Profile), we add a dedicated **"System Access"** card.

- _State A (Linked):_ Shows "Access Granted: STAFF." Button to `[Revoke Access]` (which deletes the `LabUser` but keeps the `LabStaff` history intact).
- _State B (Unlinked):_ Shows "No System Access." Button to `[Invite to LabOS]`.

---

### Why this is the "Enterprise ERP" Standard:

1.  **Protects Historical Data:** If you fire a technician, you click "Deactivate" on their `/team` profile. Behind the scenes, the Server Action sets `LabStaff.isActive = false` AND deletes their `LabUser` login. They can no longer log in, but their name stays permanently attached to the 500 historical cases they manufactured, preserving your audit trails.
2.  **Solves the "Ghost User" Problem:** A lab owner never has to wonder who "user_1234" is in the settings panel. Every login is tied to a physical employee on the production floor.
3.  **Scales for "Non-Digital" Workers:** Many labs have older technicians or drivers who will _never_ log into the software. This architecture allows the manager to track their workload and assign them cases without wasting a paid "Software Seat" on them.

**This unified approach makes LabOS a true Operations Manager, not just a software settings panel.**

---

## Q2: Invitation, Auth and Humans

This is an excellent review point. Your schema is incredibly strong because it cleanly separates **Authentication** (`AuthUser`), **System Permissions** (`LabUser`), and **Operational Identity** (`LabStaff`).

Based on your requirement to _“generate invite links to allow staff to sign up,”_ we need to refine the architecture slightly. Right now, there is a gap in the schema regarding how a pending invitation is tracked before the user actually signs up.

Here is the **Complete, Updated Architecture Plan for the `/team` Route**, including the necessary schema tweak for the invitation flow.

---

### 1. Schema Optimization: The Invitation Flow

If you generate an invite link for "Ahmed" (a new `LabStaff`), Ahmed doesn't have an `AuthUser` or `LabUser` yet. We need a secure way to hold that invitation so when he clicks the link, the system knows _who_ he is supposed to become.

**Schema Update Recommendation:**
Add an `Invitation` model (or add fields to `LabStaff`) to securely manage pending sign-ups.

```prisma
// Recommended addition to schema.prisma
model LabInvitation {
  id         String   @id @default(uuid())
  token      String   @unique @default(uuid()) // The secure string in the URL
  email      String   // Where the invite was sent
  labId      String
  lab        Lab      @relation(fields: [labId], references: [id], onDelete: Cascade)

  // The crucial link: When they sign up, attach their new LabUser to this LabStaff
  labStaffId String?  @unique
  labStaff   LabStaff? @relation(fields: [labStaffId], references: [id], onDelete: Cascade)

  // System Permissions they will be granted upon sign up
  roleToGrant LabRole @default(STAFF)

  expiresAt  DateTime
  createdAt  DateTime @default(now())
}
```

---

### 2. The Global Layout: `/team` Dashboard

This is the central command for HR and Operations. It adheres to the `max-w-[2000px]` strict boundary.

**Zone A: The Command Header**

- _Context:_ "Production Team & Staff".
- _Actions:_ `[+ Register Team Member]` (Primary).
- _Global Filter Strip:_ A row of interactive `FilterChip` components to sort the grid below (e.g., `[Ceramists]`, `[Couriers]`, `[Active Users Only]`).

**Zone B: The Workforce Pulse (Top Strip)**

- A 3-card horizontal strip displaying operational health:
    1.  **Total Workforce:** Count of Active vs. Inactive staff.
    2.  **System Access:** "12/24 staff have software access."
    3.  **Overall Lab Turnaround:** The combined speed of the team (e.g., "Avg 3.2 Days").

**Zone C: The Roster Grid (The Main View)**

- A fluid CSS grid (`auto-fit`, `minmax`) of `StaffMemberCard` components.
- **The Card UX:**
    - _Identity:_ Avatar, Name, `jobTitle` (e.g., "Senior Ceramist").
    - _Operational Role:_ The `StaffRoleCategory` displayed as a colored badge.
    - _Access Status:_ A highly visible indicator:
        - 🟢 "Active User" (Linked to `LabUser`).
        - 🟡 "Invite Pending" (Linked to `LabInvitation`).
        - ⚪ "No Access" (Pure operational worker).
    - _Live Capacity Bar:_ Shows their current assigned case load.

---

### 3. The Registration Flow: `RegisterStaffSheet`

This slide-over handles the creation of the `LabStaff` entity and the generation of the `LabInvitation` in one smooth flow.

- **Step 1: Operational Identity (The Human)**
    - Inputs: `firstName`, `lastName`, `phoneNumber`, `roleCategory` (Dropdown mapped to your Enum), `jobTitle` (Custom string).
- **Step 2: Financial Config (Commission)**
    - Inputs: `commissionType` (Percentage/Fixed) and `commissionValue`.
- **Step 3: System Access (The Toggle)**
    - A massive switch: _"Grant Software Access?"_
    - _If OFF:_ Action says "Register Staff Member".
    - _If ON:_ Expands to show an `Email` input and a `LabRole` dropdown (Owner, Admin, Manager, Staff).
    - _Action:_ Says "Register & Generate Invite".

**The Success Handshake (UX Magic):**
If Access was granted, the server creates the `LabStaff` and the `LabInvitation`, returning the secure `token`.
The Sheet transitions to a "Success Screen" displaying the secure Invite Link and a "Copy Link" button, exactly like the Public Invoice sharing flow!

---

### 4. The Staff Dossier: `/team/[staffId]`

When a manager clicks a card in the Roster Grid, they enter the deep-dive view. We reuse the **70/30 Split-Screen Canvas**.

**The Left Pane (70%): "The Workbench"**

- **Tab 1: Active Assignments**
    - A data table showing cases currently `ASSIGNED` or `PROCESSING` by this staff member.
    - _Action:_ Manager can reassign a case if the employee is overwhelmed.
- **Tab 2: Operational History**
    - A virtualized table of all `COMPLETED` cases they worked on.

**The Right Pane (30%): "The HR Profile"**

- **Card 1: Identity & Meta**
    - Contact info, address, and specializations.
- **Card 2: System Access (The Identity Bridge)**
    - This card watches the `LabUser` and `LabInvitation` relations.
    - _State A (Linked):_ Shows the `AuthUser` email and `LabRole`. Includes a red `[Revoke Access]` button (which deletes the `LabUser` but keeps the `LabStaff` intact).
    - _State B (Pending):_ Shows the expiration date of the invite. Includes a `[Copy Invite Link]` button and `[Cancel Invite]`.
    - _State C (No Access):_ Includes a `[Generate Invite Link]` button to upgrade an operational worker into a software user.
- **Card 3: Performance Vitals**
    - Average Turnaround Time & Lifetime Remake Rate.

---

### Why this Architecture is "Enterprise Grade":

1.  **Immutability of History:** By decoupling `LabUser` from `LabStaff`, you can safely delete a compromised login without destroying the financial history of 500 cases that the human physically worked on.
2.  **Frictionless Onboarding:** A lab owner doesn't need to ask an employee to "Go to the website and sign up, then tell me so I can approve you." The owner generates a secure link, sends it via WhatsApp, and the employee is instantly bound to the correct lab and permissions upon clicking it.
3.  **Visual Truth:** The Roster Grid instantly tells the lab owner exactly who has access to the software, eliminating security blind spots.

---

Here are the precise schema updates required to execute the "Unified Identity" and Invitation flow, followed by the finalized architecture for the `/team` route.

---

### PART 1: The Schema Updates

To properly handle secure, role-based invitations that link a physical worker (`LabStaff`) to a digital login (`AuthUser`/`LabUser`), we must add a `LabInvitation` model.

**Add this to your `schema.prisma`:**

```prisma
/// THE INVITATION SYSTEM
/// Manages pending secure links sent to staff to join the software.
model LabInvitation {
  id         String   @id @default(uuid())
  token      String   @unique @default(uuid()) // Secure token for the URL (e.g. /invite/[token])
  email      String   // The email the invite was sent to

  labId      String
  lab        Lab      @relation(fields: [labId], references: [id], onDelete: Cascade)

  // The crucial link: When they sign up, the new LabUser is bound to this physical worker
  labStaffId String?  @unique
  labStaff   LabStaff? @relation(fields: [labStaffId], references: [id], onDelete: Cascade)

  // The system permissions they will be granted upon successful sign-up
  roleToGrant LabRole @default(STAFF)

  expiresAt  DateTime
  createdAt  DateTime @default(now())

  @@index([labId])
  @@index([email])
}
```

**Required Reverse Relations (Updates to Existing Models):**

1.  **Update `Lab` Model:**
    ```prisma
    model Lab {
      // ... existing fields
      invitations LabInvitation[]
    }
    ```
2.  **Update `LabStaff` Model:**
    ```prisma
    model LabStaff {
      // ... existing fields
      labUser       LabUser?       // Existing relation
      labInvitation LabInvitation? // NEW: Track if they have a pending invite
    }
    ```

---

### PART 2: Final Architecture for `/team` (The Roster)

With the database capable of tracking "Humans" vs. "Logins" vs. "Pending Invites," here is the finalized, high-performance architecture for the `/team` route.

#### 1. The Global Layout (`/app/(main)/team/page.tsx`)

- **Type:** Server Component.
- **Responsibilities:**
    - Fetch the aggregate vitals (Total Staff, Total Active Users).
    - Initialize the `max-w-[2000px] mx-auto` layout boundaries.
    - Render the `TeamClientWrapper`.

#### 2. The Client Wrapper (`TeamClientWrapper.tsx`)

- **Type:** Client Component.
- **Responsibilities:**
    - Hold the `TeamFilters` state (e.g., searching by name, filtering by `roleCategory`, filtering by "Has System Access").
    - Manage the `useQuery` to fetch the `LabStaff` array dynamically.

#### 3. The Command Header & Vitals

- **Visuals:** A sticky, frosted-glass header with `bg-primary/5` ambient lighting.
- **Actions:**
    - Search Bar.
    - Filter Chips (e.g., `[Ceramists]`, `[Drivers]`).
    - Primary Button: **`[+ Register Staff Member]`** $\rightarrow$ Opens the `RegisterStaffSheet`.

#### 4. The Main Workspace: `StaffRosterGrid.tsx`

- **Layout:** CSS Grid (`grid-cols-[repeat(auto-fit,minmax(300px,1fr))]`) to handle massive ultra-wide monitors gracefully.
- **The Component:** `StaffMemberCard.tsx`
    - _Identity:_ Avatar and Name.
    - _Role Badge:_ E.g., `SENIOR_TECHNICIAN` in deep blue.
    - _The System Status Pill (Crucial UX):_
        - If `labUser` exists $\rightarrow$ 🟢 **"Active User"** (Shows their `LabRole`).
        - If `labInvitation` exists $\rightarrow$ 🟡 **"Invite Pending"** (Shows expiration date).
        - If neither exists $\rightarrow$ ⚪ **"No Access"** (Operational only).
    - _Action:_ Clicking the card pushes the router to `/team/[staffId]`.

#### 5. The Registration Engine: `RegisterStaffSheet.tsx`

- **Layout:** A Slide-over Sheet.
- **Section 1 (The Worker):** `firstName`, `lastName`, `phoneNumber`, `roleCategory` (Dropdown).
- **Section 2 (Financials):** `commissionType` and `commissionValue`.
- **Section 3 (System Access Toggle):**
    - If checked, reveals `email` and `LabRole` inputs.
- **The Handshake Modal:**
    - If "System Access" was checked, successful submission doesn't just close the sheet. It replaces the sheet content with a **"Success & Share" view**.
    - It displays the newly generated `LabInvitation.token` as a secure URL (e.g., `labos.app/invite/abc-123`) with a 1-click **"Copy Link"** and **"Share via WhatsApp"** button.

---

### PART 3: Final Architecture for `/team/[staffId]` (The Dossier)

This page uses the 70/30 split to analyze a single employee's footprint in the lab.

#### 1. The Left Pane (70%): The Work History

- **Active Workbench:** A data table of all cases where this `staffId` is in `CaseStaffAssignment`, and the case status is `ASSIGNED` or `PROCESSING`.
- **Completed Log:** A virtualized history table of all `COMPLETED/DELIVERED` cases they worked on.

#### 2. The Right Pane (30%): The HR Profile & Access Manager

- **Profile Card:** Read-only view of their name, role, and commission setup.
- **System Access Card (The Security Hub):**
    - _If `LabUser` exists:_ Shows their linked email. Button: **`[Revoke Access]`** (Deletes `LabUser`, safely preserving `LabStaff` history).
    - _If `LabInvitation` exists:_ Shows the secure link. Buttons: **`[Copy Link]`**, **`[Cancel Invite]`**.
    - _If Neither:_ Button: **`[Generate System Invite]`** (Opens a tiny modal to ask for an email and `LabRole`, then creates the invitation).
- **Edit Action:** A sticky button at the bottom: **`[Edit Staff Profile]`** (Opens an edit version of the `RegisterStaffSheet`).

---

### The "Awwwards" Value Proposition

This architecture completely solves the "Ghost User" problem that plagues typical SaaS apps. A Lab Owner never has to navigate to a generic "Settings > Users" page to figure out who has access to the software. Access is treated as a **physical keycard** handed to a specific worker on the floor, managed directly from their HR profile.
