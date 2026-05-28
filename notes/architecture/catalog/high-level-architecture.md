# Catalog & Pricing Matrix

The **`/catalog`** route is the "Master Blueprint" of the lab. It is the central repository where the Lab Owner defines what they sell (`Products`), how it's organized (`Categories` / `Work Types`), and what it costs (`Default Pricing Plans`).

Since you already built the beautiful `CreateWorkTypeSheet` and `CreatePricingPlanSheet` during the Case Creation phase, this page will simply be the **Global Control Center** to manage those entities outside of an active case.

Here is the "Awwwards-Level" Architecture Plan for the **Catalog & Pricing Matrix**.

---

### PART 1: The Visual Layout (The "Matrix" Architecture)

We want to avoid a boring Excel-style list. The catalog is a hierarchy (`Category` $\rightarrow$ `WorkType` $\rightarrow$ `Product` $\rightarrow$ `Price`). We will use a **Three-Pane Cascading Layout**.

- **Zone A: The Command Header**
    - _Context:_ "Manufacturing Catalog"
    - _Actions:_ "Add Category", "Add Work Type", "Add Product".
- **Zone B: The Hierarchy Browser (Left Pane - 30%)**
    - A vertically scrolling accordion list.
    - _Level 1:_ Categories (e.g., 💎 Fixed Prosthetics).
    - _Level 2:_ Work Types (e.g., Crowns & Bridges).
    - Clicking a Work Type highlights it and updates the Right Pane.
- **Zone C: The Product Matrix (Right Pane - 70%)**
    - When a Work Type is selected on the left, the right pane populates with all associated `Products`.
    - Displayed as a beautiful, high-density **Card Grid** (not a table).
    - Each card represents a Product (e.g., "Zirconia Multi-Layer") and prominently displays its **Default Base Price**.

---

### PART 2: Component Breakdown & Interactions

#### 1. `CatalogBrowser` (The Left Pane)

- **UX Design:** Uses the `CaseCategory` and `WorkType` Prisma models.
- **Interaction:** clicking a Category expands it to show Work Types. Clicking a Work Type updates a URL parameter (e.g., `/catalog?workTypeId=123`). This keeps the state perfectly sync'd with the server and allows deep-linking.
- **Visuals:** Uses your established icons (💎, 🦷, 🔩) and the `primary/10` active state background to show which department is currently selected.

#### 2. `ProductMatrixGrid` (The Right Pane)

- **UX Design:** Reads the `workTypeId` from the URL and fetches the `Products` (including their `isDefault` pricing plan).
- **The Product Card:**
    - _Header:_ Product Name & Material (e.g., E-Max Pressed).
    - _Body:_ The Default Pricing Strategy (e.g., "Per Unit: $140.00").
    - _Footer:_ Quick actions (`Edit Product`, `Manage Pricing Tiers`).
- **Empty State:** If a Work Type is selected but has no products, display an elegant empty state prompting them to create one.

#### 3. `PricingTierManager` (Slide-over Sheet)

- **UX Design:** Clicking "Manage Pricing Tiers" on a product card opens a sheet.
- **Purpose:** This shows the `isDefault: true` plan at the top, followed by a list of all custom deals cut for specific clinics (`clinicId !== null`).
- **Why it's elite:** It allows the Lab Owner to see: _"My base price for Zirconia is $140, but I have 3 clinics currently getting it for $120."_

---

### PART 3: Server-Side Hydration & Caching (The N+1 Fix)

This page could easily trigger massive N+1 queries if we aren't careful.

**The Optimized Query:**
In `page.tsx`, we will fetch the entire Category $\rightarrow$ WorkType tree in one query for the Left Pane:

```typescript
const catalogTree = await prisma.caseCategory.findMany({
	where: { labId },
	include: {
		workTypes: {
			select: { id: true, name: true },
		},
	},
});
```

Then, based on the `?workTypeId=` search param, we execute a highly focused query for the Right Pane:

```typescript
const activeProducts = await prisma.product.findMany({
	where: { workTypeId: searchParams.workTypeId },
	include: {
		casePricingPlans: {
			where: { isDefault: true }, // Only fetch the base price for the catalog view!
		},
	},
});
```

---

### PART 4: The "Awwwards" Value Proposition

1.  **Contextual Modals:** You already built `CreateCategorySheet`, `CreateWorkTypeSheet`, and `CreateProductSheet`. We simply drop them into this page. Because of how cleanly you built them, they will work perfectly here outside of the Case Creation flow.
2.  **The "Global Price Bump" Feature (Future Proofing):** By organizing the catalog this way, you are setting up the architecture for a highly requested ERP feature: _“Raise all Zirconia prices by 5%.”_
3.  **Visual Separation of Finance:** The Left Pane (Categories) uses your clinical Blue/Violet theme. The Right Pane (Products & Base Prices) utilizes the Emerald financial theme, keeping the user's mental model consistent.

---
