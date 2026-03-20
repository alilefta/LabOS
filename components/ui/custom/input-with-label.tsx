"use client";

import { ControllerFieldState, ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Generic S for Schema
type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	containerClassName?: string;
	inputClassName?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, inputClassName, containerClassName, fieldState, field, placeholder, ...props }: Props<S>) {
	const { type } = props;

	console.log("field state error", fieldState.error);
	return (
		<Field data-invalid={fieldState.invalid} className={cx("relative", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className="text-sm font-medium dark:text-zinc-400 text-zinc-500">
				{fieldTitle}
			</FieldLabel>

			<Input
				type={type || "text"}
				{...field}
				{...props}
				value={field.value ?? ""}
				id={nameInSchema}
				aria-invalid={fieldState.invalid}
				placeholder={placeholder}
				inputMode={type === "number" ? "numeric" : undefined}
				className={cn(
					// Flux Glass Style
					"h-11 rounded-xl bg-background/40 border-background/60 text-md text-foreground",
					"dark:placeholder:text-zinc-600 placeholder:text-zinc-400 font-sans shadow-sm transition-all duration-200",

					// Focus State (Indigo Glow)
					"focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
					"dark:focus-visible:bg-background/40 focus-visible:bg-background",

					// Error State
					fieldState.invalid && "border-red-500/50 focus-visible:ring-red-500/20",

					type === "number" && "no-spinner",
					inputClassName,
				)}
			/>

			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-xs text-red-400 ml-1 mt-1" />}
		</Field>
	);
}
