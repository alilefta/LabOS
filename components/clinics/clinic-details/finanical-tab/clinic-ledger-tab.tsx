import { ClinicInvoiceHistory } from "./clinic-invoice-history";
import { CustomPricingPlanList } from "./custom-pricing-plans-list";

export function ClinicLedgerTab({ clinicId }: { clinicId: string }) {
	return (
		<div className="flex flex-col gap-6 w-full h-full min-h-0">
			<CustomPricingPlanList clinicId={clinicId} />
			<ClinicInvoiceHistory clinicId={clinicId} />
		</div>
	);
}
