## Critical Issue 2: Invoice "Line Item" Snapshot Missing

The Flaw: Your InvoiceCase junction links an Invoice directly to a Case and snapshots the caseTotal.
The Risk: An invoice is a legal document. If you look at an invoice 3 years from now, you need to know exactly what was on it. Currently, you are relying on the live Case and CaseWorkItem tables to render the PDF. If a user deletes a CaseWorkItem two years from now, your historical Invoice PDF will break or show missing data!
The Fix: You must create an InvoiceLineItem model that snapshots the text description and quantity of what was sold at the exact moment the invoice was frozen.

A database schema for an ERP system like LabOS isn't just about storing data—it dictates the operational rules of the laboratory. After thoroughly auditing your updated Prisma schema against standard clinical workflows and financial edge cases, I have identified **3 critical structural issues** that need to be addressed.

---

### Critical Issue 1: Dentists, Clinics, and Orphaned Cases

- **The Flaw:** Your `Dentist` model `belongsTo` a `Clinic`. The `Case` model has an optional `dentistId`.
- **The Risk:** What happens if Dr. Ahmed leaves "Apex Dental Design" and moves to "City Smiles Clinic"? If you update his `clinicId` to his new clinic, **all his historical cases from Apex Dental will suddenly appear as if they were billed to City Smiles!** This destroys financial history and cross-pollinates data between separate business entities.
- **The Fix:** You must create a "Historical Snapshot" on the `Case` model. A `Dentist` is a human, and they move around. You need a `DentistClinicAffiliation` junction table if they work at multiple clinics, or you must capture the `prescribingDentistName` directly on the `Case` at the moment of creation so it never changes, even if the dentist moves.

- _My Recommendation:_ Snapshot the data. Add `prescribingDentistName` to the `Case` model.

### Critical Issue 2: The "Partial Payment" Edge Case

- **The Flaw:** `InvoicePayment` links directly to a single `Invoice`.
- **The Risk:** In the Iraqi market (and many others), clinics often send a single bulk payment at the end of the month. Example: "Here is $1,000 via ZainCash to cover Invoice A, Invoice B, and half of Invoice C." Your current model forces the lab accountant to split that $1,000 into three separate `InvoicePayment` records manually.
- **The Fix:** You need a `Payment` model that represents the _actual transaction_ (e.g., $1,000 via ZainCash). Then, you need a `PaymentApplication` junction table that links portions of that Payment to specific Invoices.

### Critical Issue 3: Case Activity Logging is Too Heavy

- **The Flaw:** `CaseActivityLog` uses a `Json?` payload to store "old/new values".
- **The Risk:** While `Json` is great for flexibility, storing a massive diff of a `Case` every time someone clicks "Save" will bloat your database into gigabytes within months for a high-volume lab.
- **The Fix:** Keep the `Json` payload, but be _extremely_ strict in your application logic about what goes in there. Only store the exact field that changed (e.g., `{ "deadline": { "old": "2026-04-01", "new": "2026-04-05" } }`), not the whole case object. No schema change is needed here, just a strict warning for your backend implementation!

---

### Recommended Prisma Updates (Copy & Paste)

Here are the specific model updates to fix Issues 1 and 2, which will save you from massive accounting headaches in the future.

#### 1. Fix the Dentist / Clinic Migration Problem

```prisma
model Case {
  // ... existing fields ...
  clinicId String?
  clinic   Clinic? @relation(fields: [clinicId], references: [id], onDelete: SetNull)

  dentistId String?
  dentist   Dentist? @relation(fields: [dentistId], references: [id], onDelete: SetNull)

  // 🔥 NEW: Snapshot the names at the time of creation!
  // If the clinic renames itself or the dentist moves to a new clinic,
  // this historical record remains 100% accurate.
  clinicNameSnapshot  String?
  dentistNameSnapshot String?

  // ... rest of the model
}
```

#### 2. Fix the Bulk Payment Problem

Replace your current `InvoicePayment` model with these two models:

```prisma
/// Represents a physical transaction (e.g., $1000 received via ZainCash)
model Payment {
  id        String  @id @default(uuid())
  labId     String
  lab       Lab     @relation(fields: [labId], references: [id], onDelete: Cascade)

  // Who sent the money?
  clinicId  String
  clinic    Clinic  @relation(fields: [clinicId], references: [id], onDelete: Cascade)

  amount    Decimal       @db.Decimal(10, 2)
  method    PaymentMethod
  reference String?       // SuperQI transaction ID, cash receipt number
  notes     String?
  paidAt    DateTime

  // How was this money distributed across their invoices?
  applications PaymentApplication[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([labId])
  @@index([clinicId])
}

/// Junction table: Distributes a single Payment across multiple Invoices
model PaymentApplication {
  id        String  @id @default(uuid())

  paymentId String
  payment   Payment @relation(fields: [paymentId], references: [id], onDelete: Cascade)

  invoiceId String
  invoice   Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  // How much of the total payment went to THIS specific invoice?
  appliedAmount Decimal @db.Decimal(10, 2)

  createdAt DateTime @default(now())

  @@unique([paymentId, invoiceId])
  @@index([invoiceId])
}

// Don't forget to update your `Invoice` and `Clinic` models to point to these new relations:
model Invoice {
  // ... existing fields ...
  // Remove: payments InvoicePayment[]
  paymentApplications PaymentApplication[] // 🔥 NEW
}

model Clinic {
  // ... existing fields ...
  payments Payment[] // 🔥 NEW
}
```

### Why this architecture is elite:

If Dr. Sarah owes you for Invoice #1 ($400) and Invoice #2 ($600). She sends you $500 via ZainCash.

- You create **one** `Payment` record for $500.
- You create a `PaymentApplication` linking $400 to Invoice #1 (Status ➔ PAID).
- You create a `PaymentApplication` linking $100 to Invoice #2 (Status ➔ PARTIAL).

This perfectly mirrors how real-world accountants balance books (Double-Entry ledgers).

Does this payment distribution logic align with how labs in your market handle collections?

---

Good evening! You have an excellent memory. Yes, in my previous review, I strongly recommended adding `InvoiceLineItem` and the `manualDiscountAmount` / `isWarranty` flags.

Because we paused to discuss the `LabSettings` architecture, I didn't include them in the final code block of the previous message.

Let's integrate those right now. They are absolutely non-negotiable for a system that aims to handle high-end dental manufacturing and billing securely.

Here is the exact schema update to finalize your database architecture.

### 1. The Remake & Warranty Fix (Update to `Case` model)

We add the `isWarranty` flag to handle free remakes, and the `manualDiscountAmount` to handle courtesy discounts (e.g., "We messed up the shade, so we are giving you $50 off this specific case").

```prisma
model Case {
  // ... existing fields ...
  status     CaseStatus @default(DRAFT)
  grandTotal Decimal?   @default(0)

  // 🔥 NEW: Financial overrides for this specific case
  manualDiscountAmount Decimal  @default(0) @db.Decimal(10, 2)
  manualDiscountReason String?  // e.g. "Doctor dropped it, 50% courtesy discount applied"
  isWarranty           Boolean  @default(false) // If true, the case is billed at $0.00 automatically.

  clinicId String?
  clinic   Clinic? @relation(fields: [clinicId], references: [id], onDelete: SetNull)

  // ... existing relations ...

  // Remake Tracking
  isRemake Boolean @default(false)
  originalCaseId String?
  originalCase   Case?   @relation("CaseRemakes", fields: [originalCaseId], references: [id], onDelete: SetNull)
  remakes        Case[]  @relation("CaseRemakes")

  failureReason String?
  failureFault  FaultParty?

  // ... rest of the model ...
}
```

### 2. The Immutable Invoice Fix (Add `InvoiceLineItem` model)

Right now, if you generate an invoice, and a week later a user deletes a `CaseWorkItem` from the database, your invoice total will say "$500", but when the clinic views the PDF, it will only show items adding up to "$200".

**Invoices must be immutable.** You must freeze the text and price of what was sold at the exact moment the invoice was generated.

```prisma
// Remove the simple `InvoiceCase` junction table.
// Replace it with this robust `InvoiceLineItem` model.

model InvoiceLineItem {
  id        String  @id @default(uuid())

  invoiceId String
  invoice   Invoice @relation(fields: [invoiceId], references: [id], onDelete: Cascade)

  labId     String
  lab       Lab     @relation(fields: [labId], references: [id], onDelete: Cascade)

  // Optional link back to the source Case (SetNull so if the case is deleted, the invoice line item remains!)
  caseId    String?
  case      Case?   @relation(fields: [caseId], references: [id], onDelete: SetNull)

  // 🔥 THE IMMUTABLE SNAPSHOT DATA
  // This is what actually gets printed on the PDF. It never changes, even if the original product is renamed or deleted.
  description String  // e.g., "Case #LAB-001: Zirconia Crown (Tooth 14)"
  quantity    Int     @default(1)
  unitPrice   Decimal @db.Decimal(10, 2)
  totalPrice  Decimal @db.Decimal(10, 2) // quantity * unitPrice

  createdAt DateTime @default(now())

  @@index([invoiceId])
  @@index([labId])
  @@index([caseId])
}
```

### 3. Update the `Invoice` model to match

Now, update the `Invoice` model to point to the new `InvoiceLineItem` instead of the old `InvoiceCase` junction.

```prisma
model Invoice {
  id       String @id @default(uuid())
  labId    String
  lab      Lab    @relation(fields: [labId], references: [id], onDelete: Cascade)
  clinicId String
  clinic   Clinic @relation(fields: [clinicId], references: [id], onDelete: Cascade)

  invoiceNumber String
  status        InvoiceStatus @default(DRAFT)
  notes         String?

  // Financial Totals
  subtotal                  Decimal  @db.Decimal(10, 2)
  discountAmount            Decimal  @default(0) @db.Decimal(10, 2)
  appliedDiscountPercentage Decimal? @db.Decimal(5, 2)
  discountReason            String?

  total      Decimal @db.Decimal(10, 2)
  amountPaid Decimal @default(0) @db.Decimal(10, 2)
  amountDue  Decimal @db.Decimal(10, 2)

  // ... Dates and Tokens ...

  // 🔥 NEW: Relations
  lineItems           InvoiceLineItem[]    // Replaces `cases InvoiceCase[]`
  paymentApplications PaymentApplication[] // Replaces `payments InvoicePayment[]`

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([labId, invoiceNumber])
  @@index([labId])
  @@index([clinicId])
  @@index([labId, status])
}

// And update the Case model to hold the back-link to the Line Items:
model Case {
    // ...
    invoiceLineItems InvoiceLineItem[]
    // ...
}
```

### Why this makes your SaaS Enterprise-Grade:

If you pitch this software to a large dental lab in Iraq or Dubai, they will ask: _"What happens if a technician accidentally deletes a case from last year?"_

With this architecture, you can confidently answer: _"Your historical invoices and financial ledgers are completely frozen and safe. Deleting a case removes the production record, but the financial line items and payments are permanent."_

This is the exact database schema you need to build a bulletproof financial engine. Are you ready to run `npx prisma db push` and start building the UI for the Clinic Dossier?
