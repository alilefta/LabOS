"use client";

import { ControllerFieldState, ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	containerClassName?: string;
	inputClassName?: string;
	labelClassName?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	placeholder?: string;
	isOptional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S extends FieldValues>({
	fieldTitle,
	nameInSchema,
	inputClassName,
	containerClassName,
	fieldState,
	field,
	placeholder,
	isOptional = false,
	labelClassName,
	...props
}: Props<S>) {
	const { type } = props;

	return (
		<Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid} className={cn("relative flex flex-col  space-y-1.5 w-full", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className={cn("text-[13px] font-semibold text-slate-700 dark:text-zinc-300", labelClassName)}>
				{fieldTitle}
				{isOptional && <span className="text-slate-500 dark:text-zinc-500">(Optional)</span>}
			</FieldLabel>
			<Input
				{...props}
				{...field}
				type={type || "text"}
				// value={field.value ?? ""}

				value={field.value === undefined || field.value === null ? "" : field.value}
				id={nameInSchema}
				aria-invalid={fieldState.invalid}
				placeholder={placeholder}
				inputMode={type === "number" ? "numeric" : undefined}
				className={cn(
					// LabOS Premium Input Styling
					"h-11 rounded-xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-sm text-foreground",
					"placeholder:text-slate-400 dark:placeholder:text-zinc-500 font-sans shadow-sm transition-all duration-200",
					"hover:border-slate-300 dark:hover:border-white/20",

					// Focus State (LabOS Precision Ring)
					"focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:outline-none focus-visible:bg-white dark:focus-visible:bg-[#121214]",

					// Error State
					fieldState.invalid && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",

					type === "number" && "no-spinner",
					inputClassName,
				)}
				// onChange={(e) => {
				// 	if (type === "number") {
				// 		field.onChange(e.target.value === "" ? undefined : e.target.valueAsNumber);
				// 	} else {
				// 		field.onChange(e.target.value);
				// 	}
				// }}

				// 2. THE FIX: Let RHF handle the raw string natively!
				// onChange={(e) => {
				// 	// Allow any custom onChange passed via props to run
				// 	if (propsOnChange) {
				// 		propsOnChange(e);
				// 	}

				// 	// If it's a number field and the user clears it, pass undefined
				// 	if (type === "number" && e.target.value === "") {
				// 		field.onChange(undefined);
				// 	} else {
				// 		// Otherwise, just pass the raw event.
				// 		// RHF stores the string, Zod transforms it to a number on submit!
				// 		field.onChange(e);
				// 	}
				// }}
			/>

			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[11px] font-medium text-destructive mt-1.5 block" />}
		</Field>
	);
}
