BEGIN;

-- CreateEnum
CREATE TYPE "InvoicePublicLinkAuditEvent" AS ENUM ('ISSUED', 'DISCLOSED');

-- CreateTable
CREATE TABLE "InvoicePublicLinkAudit" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "actorMemberId" TEXT NOT NULL,
    "correlationId" TEXT NOT NULL,
    "event" "InvoicePublicLinkAuditEvent" NOT NULL,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvoicePublicLinkAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InvoicePublicLinkAudit_organizationId_labId_createdAt_idx" ON "InvoicePublicLinkAudit"("organizationId", "labId", "createdAt");

-- CreateIndex
CREATE INDEX "InvoicePublicLinkAudit_invoiceId_createdAt_idx" ON "InvoicePublicLinkAudit"("invoiceId", "createdAt");

-- CreateIndex
CREATE INDEX "InvoicePublicLinkAudit_actorMemberId_createdAt_idx" ON "InvoicePublicLinkAudit"("actorMemberId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InvoicePublicLinkAudit_correlationId_event_key" ON "InvoicePublicLinkAudit"("correlationId", "event");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_labId_key" ON "Invoice"("id", "labId");

-- AddForeignKey
ALTER TABLE "InvoicePublicLinkAudit" ADD CONSTRAINT "InvoicePublicLinkAudit_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InvoicePublicLinkAudit" ADD CONSTRAINT "InvoicePublicLinkAudit_labId_organizationId_fkey" FOREIGN KEY ("labId", "organizationId") REFERENCES "Lab"("id", "organizationId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InvoicePublicLinkAudit" ADD CONSTRAINT "InvoicePublicLinkAudit_invoiceId_labId_fkey" FOREIGN KEY ("invoiceId", "labId") REFERENCES "Invoice"("id", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

COMMIT;
