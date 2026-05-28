# Detailed Catalog & Pricing Matrix

Here is the detailed, code-ready architectural plan for **Part 1 (The Shell & Header)** and **Part 2 (The Left Pane Hierarchy Browser)**.

---

### PART 1: The Shell & Header Architecture (Server-Driven)

The foundation of the `/catalog` page must perfectly match the `max-w-[2000px]` strict railing established in the Clinic and Case modules. It relies entirely on Server Components to render the layout structure before shipping any JavaScript to the client.

#### 1. The Route Component (`app/(main)/catalog/page.tsx`)

- **Type:** Server Component.
- **Responsibilities:**
    - Parse the `searchParams` for `categoryId` and `workTypeId`.
    - Execute the `getCategoryTreeAction` (fetches Categories and nested WorkTypes).
    - Execute the `getProductsByWorkTypeAction` (only if `workTypeId` is present).
    - Inject the fetched data into the Left Pane and Right Pane components.
- **Styling Direction:**
    - Uses the established `flex flex-col h-full bg-background relative overflow-hidden`.
    - Applies the global `<AmbientBgGlow variant="primary" />` (to signify this is an operational/clinical setup page).
    - Implements the `flex-1 min-h-0` wrapper to ensure the 70/30 split columns can scroll independently without breaking the viewport.

#### 2. The Header Component (`CatalogHeader.tsx`)

- **Type:** Client Component (Only because it contains interactive buttons that open Modal Sheets).
- **Responsibilities:**
    - Provide Wayfinding ("Manufacturing Catalog").
    - House the global creation actions (`+ New Category`, `+ New Product`).
- **Styling Direction:**
    - `sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border`.
    - The "New Product" button uses the `shadow-premium bg-primary hover:bg-primary/90` styling to draw the eye as the primary action.

---

### PART 2: The Left Pane Hierarchy Browser

This is the navigation engine for the catalog. It is a vertical accordion list. To maximize performance, we will handle the "expansion" of categories using client-side React state, but the actual "selection" of a WorkType will trigger a Next.js `<Link>` navigation to update the server.

#### 1. The Component: `CatalogHierarchyBrowser.tsx`

- **Type:** Client Component.
- **Props:**
    - `categories`: The pre-fetched tree (`Category` with nested `WorkTypes`).
    - `activeCategoryId`: Derived from URL (or defaults to the first category).
    - `activeWorkTypeId`: Derived from URL.
- **Responsibilities:**
    - Render the list of categories.
    - Maintain an `expandedCategories` state (`Set<string>`) to remember which folders the user has opened.
- **Styling Direction:**
    - Wrapped in `w-full xl:w-96 shrink-0 h-full overflow-y-auto custom-scrollbar`.
    - No heavy backgrounds; relies on transparent padding and borders to feel lightweight.

#### 2. The Category Row (The Accordion Trigger)

- **Interaction:** Clicking the category row toggles it open/closed in the local `expandedCategories` Set.
- **Styling Direction:**
    - `flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors`.
    - Uses the `Shapes` or `LayoutGrid` icon in muted colors.
    - A Chevron icon that rotates `transform rotate-90` when expanded.
    - A small badge `px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-white/5` showing the count of nested WorkTypes (e.g., "4 Types").

#### 3. The Work Type Item (The Navigation Link)

- **Interaction:** This is _not_ a button; it is a Next.js `<Link href="?categoryId=X&workTypeId=Y" scroll={false}>`. Clicking it updates the URL, triggering the Server Component (Part 1) to fetch the products for the right pane.
- **Styling Direction:**
    - Rendered inside a `pl-6` indented container with a left border (`border-l border-border/50`) to visually connect it to the parent Category (the "Tree" look).
    - **Inactive State:** `text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-white/[0.02]`.
    - **Active State:** When `activeWorkTypeId === workType.id`, it morphs into the "Neon Precision" style: `bg-primary/10 text-primary font-bold border-l-2 border-primary -ml-[1px]`. (The negative margin makes the active border overlap the tree border perfectly).

---

### Why this Architecture guarantees 120 FPS:

1.  **Zero "Prop Drilling" Content Swaps:** Because clicking a WorkType updates the URL, the Left Pane doesn't have to manage the state of the Right Pane. It just highlights itself. The Server automatically re-renders the Right Pane with the new products.
2.  **Instant Accordions:** The open/close state of the Categories is purely local React state. Opening a folder of WorkTypes happens in 0ms without hitting the server.
3.  **Shallow Routing:** By using `<Link scroll={false}>`, the browser doesn't jump to the top of the page when the user selects a new WorkType, preserving their exact scroll position in the left-hand menu.

---

Here is the detailed architectural plan for **Part 3 (The Product Matrix)** and **Part 4 (The Pricing Tier Manager)**.

As established, this entire layout will sit inside the master structural wrapper: `max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8`, ensuring the catalog spans beautifully across ultra-wide monitors while remaining perfectly aligned with your top navigation.

---

### PART 3: The Product Matrix (Right Pane - 70%)

The Right Pane displays the actual items the lab manufactures based on the selected `workTypeId` from the URL. Because a Work Type (e.g., "Crowns") might have 40 different materials/products, we must prioritize visual scanning and density.

#### 1. The Component: `ProductMatrixGrid.tsx`

- **Type:** Server Component (Receives pre-fetched `Product[]` data from the page route).
- **Responsibilities:**
    - Map the products into a responsive grid.
    - Handle the Empty State if the selected Work Type has no products yet.
- **Styling Direction:**
    - Container: `flex-1 h-full overflow-y-auto custom-scrollbar relative pb-32`.
    - Grid: `grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6`. (The `2xl:grid-cols-3` takes advantage of your `2000px` max-width to show more data on large screens).

#### 2. The Sub-Component: `CatalogProductCard.tsx`

- **Type:** Client Component (Contains interactive hover states and edit buttons).
- **Responsibilities:**
    - Display the Product Name, Image/Icon, and **Base Price**.
    - Provide entry points to Edit Product or Manage Custom Pricing.
- **Styling Direction (The Financial Emerald Shift):**
    - **The Shell:** `lab-card p-5 group transition-all duration-300 hover:shadow-md hover:border-emerald-500/40`.
    - **The Header:** A flex row with the Product Image (left) and the Name (right). If no image exists, use a fallback `Package` icon inside a `bg-slate-100 dark:bg-[#121214]` rounded square.
    - **The Pricing Block:** A prominent, emerald-tinted area at the bottom of the card. `bg-emerald-500/[0.02] border-t border-emerald-500/10 mt-4 pt-4`.
    - **The Price Text:** `font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400`.
    - **The Actions (Hover Reveal):** Two icon buttons (`Edit` and `Manage Tiers`) positioned absolutely in the top right, utilizing `opacity-0 group-hover:opacity-100` to keep the UI clean until interacted with.

---

### PART 4: The Pricing Tier Manager (The Deep Dive)

While the Product Card shows the _Default Base Price_, a lab owner needs a way to see if they have cut special deals for specific clinics on this product. We handle this via a Slide-Over Sheet to keep the user anchored in the Catalog.

#### 1. The Component: `ManagePricingTiersSheet.tsx`

- **Type:** Client Component.
- **State Management:** Triggered by clicking "Manage Tiers" on a `CatalogProductCard`. Uses Zustand (`useCatalogUiStore`) to track the `activeProductId`, avoiding prop-drilling.
- **Responsibilities:**
    - Fetch the specific `CasePricingPlan[]` for the active product using TanStack Query (since this data is too heavy to pre-fetch for the whole matrix).
    - Display the Default Plan vs. Custom Clinic Plans.
- **Styling Direction:**
    - Standard `SheetContent` with `sm:max-w-xl border-l border-border bg-card shadow-2xl`.
    - **Header:** `bg-emerald-500/5` with a `Wallet` icon, titled "Pricing & Overrides."

#### 2. The Sub-Component: `PricingTierRow.tsx`

- **Responsibilities:** Visualize a single pricing plan (Per Tooth, Bulk, or Custom).
- **Styling Direction:**
    - **Default Plan:** Rendered with a solid `border-emerald-500/50` to denote it is the master price.
    - **Custom Plans:** Rendered below in a list. Features a `<ClinicBadge />` (e.g., "Apex Dental") to show who receives this price.
    - **The Math UI:** Re-uses the horizontal "Receipt" styling from your previous components.
        - _If PERTOOTH:_ `[ Unit Rate ] ------------ [ $140.00 ]` (Monospace).
        - _If BULK:_ `[ Flat Arch Rate ] ------- [ $450.00 ]` (Subtext: "Applies at 4+ Units").

#### 3. The "Add Override" Interaction

- Inside the Sheet, a dashed button `+ Create Clinic Override`.
- Clicking this simply invokes the `CreatePricingPlanSheet` (which you already built!), passing the `productId` into it. Because your architecture is modular, the existing creation sheet will handle the Zod validation, save to Prisma, and automatically invalidate the TanStack cache, causing this Tier Manager list to update instantly.

---

### Summary of the High-Performance UX:

By locking the Layout to `max-w-[2000px]` and delegating the Heavy Math (Pricing Tiers) to a lazy-loaded TanStack Query inside a Sheet, the **Product Matrix** (Part 3) will render in milliseconds. The Lab Owner can scroll through 100 products smoothly, only loading the complex pricing deals (Part 4) when they explicitly click on a specific item.
