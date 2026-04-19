-- CreateIndex
CREATE INDEX "Case_labId_deadline_idx" ON "Case"("labId", "deadline");

-- CreateIndex
CREATE INDEX "Case_labId_status_idx" ON "Case"("labId", "status");

-- CreateIndex
CREATE INDEX "CaseStaffAssignment_caseId_roleCategory_idx" ON "CaseStaffAssignment"("caseId", "roleCategory");
