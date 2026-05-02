"use client";

import { memo, useCallback, useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { MapPin, Truck, CheckCircle2, Loader2, Info } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CreateClinicInput } from "@/schema/composed/clinic.details";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for courier routing (Replace with your actual routing logic)
const MOCK_COURIER_ROUTES = ["North Zone", "South Zone", "East Route A", "Metro Express"];

export const ClinicLocationSection = memo(function ClinicLocationSection() {
	const { control, setValue, watch } = useFormContext<CreateClinicInput>();
	const [isVerifying, setIsVerifying] = useState(false);
	const [courierRoute, setCourierRoute] = useState<string | null>(null);

	// Watch city and zipcode to enable the verification button
	const city = useWatch({ control, name: "city" });
	const zipcode = useWatch({ control, name: "zipcode" });

	const handleVerifyRoute = useCallback(() => {
		if (!city) return; // Don't proceed if city is not entered
		setIsVerifying(true);

		// Simulate API call or deterministic logic
		setTimeout(() => {
			const assignedRoute = MOCK_COURIER_ROUTES[city.length % MOCK_COURIER_ROUTES.length];
			setCourierRoute(assignedRoute);
			setIsVerifying(false);
		}, 800);
	}, [city]);

	return (
		<section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Location & Shipping</h2>
			</div>

			<div className="lab-card p-6 sm:p-8 space-y-8">
				<Controller
					control={control}
					name="address1"
					render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Street Address" nameInSchema="address1" placeholder="789 Professional Dr." />}
				/>
				<Controller
					control={control}
					name="address2"
					render={({ field, fieldState }) => (
						<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Address Line 2" nameInSchema="address2" placeholder="Suite 100, Floor 5" isOptional />
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Controller
						control={control}
						name="city"
						render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="City" nameInSchema="city" placeholder="Miami" />}
					/>

					{/* Zipcode and the UX Magic Button */}
					<div className="flex items-end gap-3">
						<div className="flex-1">
							<Controller
								control={control}
								name="zipcode"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Zip Code" nameInSchema="zipcode" placeholder="33101" isOptional />}
							/>
						</div>
						{/* --- The Verification Button Logic --- */}
						<Button
							type="button"
							variant="outline"
							onClick={handleVerifyRoute}
							disabled={!city || isVerifying} // Disabled if no city or currently verifying
							className={cn(
								"h-11 px-4 rounded-xl font-bold transition-all",
								isVerifying ? "text-primary ring-1 ring-primary/30" : "border-border bg-slate-50 dark:bg-white/5 text-muted-foreground hover:border-primary/50 hover:text-foreground",
							)}
						>
							{isVerifying ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : courierRoute ? (
								<CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
							) : (
								<MapPin className="w-4 h-4 mr-2 text-primary" />
							)}
							{courierRoute ? "Route Mapped" : "Verify Route"}
						</Button>
					</div>
				</div>

				{/* Dynamic Courier Route Display */}
				{courierRoute && (
					<div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in slide-in-from-top-2">
						<Truck className="w-4 h-4 text-emerald-500 shrink-0" />
						<p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
							<span className="font-bold uppercase tracking-widest">Shipping Route:</span> {courierRoute} assigned.
						</p>
					</div>
				)}
			</div>
		</section>
	);
});

ClinicLocationSection.displayName = "ClinicLocationSection";
