"use client";

import { Controller, useFormContext } from "react-hook-form";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { cn } from "@/lib/utils";
import { memo } from "react";

export const GlobalCaseNotesSection = memo(function GlobalCaseNotesSection() {
	const { control } = useFormContext<CreateCaseInput>();
	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Clinical Notes & Instructions</h2>
			</div>

			<div className="px-1">
				<Controller
					control={control}
					name="notes"
					render={({ field, fieldState }) => (
						<CustomFieldWithLabel field={field} fieldState={fieldState} fieldTitle="Global Case Instructions" nameInSchema="notes" isOptional>
							<textarea
								{...field}
								value={field.value || ""}
								placeholder="Add any general instructions, patient preferences, or specific doctor requests for this entire case..."
								className={cn(
									"w-full min-h-30 p-4 bg-white dark:bg-[#121214] border border-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all resize-y shadow-sm custom-scrollbar",
									fieldState.invalid
										? "border-destructive focus:ring-destructive/20 focus:border-destructive"
										: "focus:ring-[3px] focus:ring-primary/20 focus:border-primary hover:border-slate-300 dark:hover:border-white/20",
								)}
							/>
						</CustomFieldWithLabel>
					)}
				/>
			</div>
		</section>
	);
});
