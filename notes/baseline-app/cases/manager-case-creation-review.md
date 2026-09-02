# Manager case creation review

Date: 2026-09-02  
Role: Manager  
Workspace: Denta Fusion3  
Case created: `#LAB-0002` (`f2e1b2c9-a970-4615-bcee-212d8ff4c4c0`)  
Data: Existing dummy clinic, dentist, patient, category, product, and pricing plan

## Flow result

The Manager could open `/cases/new-case`, select the dummy clinic and dentist,
select the existing patient, choose `Removable Appliances` → `Complete Dentures`
→ `Standard` → `test` pricing, map the full upper arch, choose a September 10
deadline, review the case, and confirm production. The action created the case
and redirected to the dossier.

F2 Manager checks completed:

- `/invoices` loaded successfully. Invoice list, analytics controls, export,
  sync, and New Invoice controls were available; the lab currently has no
  invoice rows.
- `/clinics` loaded successfully with the financial summary and New Clinic
  control.
- `/clinics/a9163f90-0ce2-42c8-8c46-6f1eb55a0d2a?tab=ledger` loaded successfully
  with negotiated pricing and billing-statement sections.
- The created Case dossier loaded successfully with operational data and the
  Manager-visible financial summary.

## App-specific findings

| Priority | Area | Observation | Suggested follow-up |
|---|---|---|---|
| P1 | Case dossier / AI auditor | The created case used `Standard` / `Complete Dentures`, but the dossier’s static Neural Auditor narrative says the material selection “Zirconia” is optimal. This is materially inconsistent with the selected prescription. | Bind the auditor narrative to the actual case/product data, or show an explicit “demo/unavailable” state until an audit is generated for this case. |
| P1 (verify) | Clinic identity | The clinic picker displayed `Dr. Sameer Nasser` with `SOLO`/`babil`, while the submitted dossier displayed `Apex Dental Design` as Clinic Partner. This may be a clinic-vs-dentist label mix-up or an incorrect relation. | Verify the selected clinic ID and final `clinic.name`; make the picker show the clinic name first and dentist as a separate field. |
| P2 | Review layout | Review text concatenates fields: `Arch: UPPERCat: Removable AppliancesDept: Complete Dentures`; the prescriber line rendered `D:Dr. Dr. Sameer Nasser`. | Add spacing/separate labels and remove the duplicated `Dr.` prefix. |
| P2 | Work-item summary | The form summary displays `UPPER` twice before `Full Maxillary Arch`. | Keep one arch label and one anatomical description. |
| P2 | Submission transition | During the initial redirect after confirmation, the browser recorded a transient `Decimal objects are not supported` server-rendering error. A full reload of the resulting dossier produced no new Decimal error, and the page loaded normally. | Keep the Case DTO boundary and add an end-to-end production-build check; investigate any recurrence in the Server Action/page transition path. |
| P3 | Cases landing page | Clicking the main content `New Case` button did not navigate; the top navigation `New Case` link worked. | Make the content button route to `/cases/new-case` or clearly behave as a modal trigger. |
| P3 | Copy | “Here You can build the case work items for your case” is awkward and repetitive. | Replace with concise instructional copy, e.g. “Add the products and anatomical positions for this case.” |
| P3 | Assets guidance | With no digital files, the auditor correctly warned that physical impressions should be mailed. | Retain the warning, but make the physical-impression workflow explicit if it is required for production. |

## Deferred scope

These are application-quality findings, separate from Authorization V1. Invoice,
Clinic, Staff, and other model DTO/relation audits remain scheduled for the F3–F5
hardening backlog. The current slice only hardens the Case DTO boundary.
