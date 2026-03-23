// import { NewCaseForm } from "@/components/cases/new-case/new-case-form";
import { CaseAiAuditor } from "@/components/cases/new-case/case-ai-auditor";

export default async function NewCasePage() {
	return (
		<div className="flex flex-col xl:flex-row gap-8 h-full">
			{/* FORM SECTION (Scrollable) */}
			<div className="flex-1 overflow-y-auto no-scrollbar pb-20">{/* <NewCaseForm /> */}</div>

			{/* AI AUDITOR & SUMMARY (Fixed/Sticky) */}
			<div className="w-full xl:w-96 shrink-0 flex flex-col gap-6 h-fit sticky top-24">
				<CaseAiAuditor />
			</div>
		</div>
	);
}
