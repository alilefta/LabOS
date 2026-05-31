# ToDOs

## Cases View /cases

### Todo 1

After i made the Active Workbench in the /team/[staffId]?tab=cases, the addition of checkboxes for selecting multiple cases then advance cases.
TODO: Create dynamic checkboxes for the /cases table view

### Todo 2

Add Quick Assign to /cases table, like clicking the unassigned in the row, then click to assign multiple staff at a time.
TODO: Add Quick Assign in /cases

---

## Clinic Details Page

### Todo 1

Allow redirected case creation by clinic:

```tsx
<Link href={`/cases/new-case?clinicId=${id}`}>
	<Plus className="w-4 h-4 mr-2" /> New Case
</Link>
```

---

---

## Lab Staff

### Todo 1

🔍 Recommended Schema Addition
To make this fully functional, I suggest adding a simple, scalar array field to your LabStaff model:
code
Prisma
model LabStaff {
// ... your existing fields

// 🔥 ADD THIS: An array of days they are physically in the lab (default to Mon-Fri)
workingDays String[] @default(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"])
}
This is highly standardized, type-safe, and allows your auto-assignment engine to run index queries like where: { workingDays: { has: today } } with sub-millisecond speeds.
