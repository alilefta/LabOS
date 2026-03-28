"use client";

import { ControllerFieldState, FieldValues, FieldPath, ControllerRenderProps } from "react-hook-form";
import { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	containerClassName?: string;
	labelClassName?: string;
	fieldState: ControllerFieldState;
	isOptional?: boolean;
	children: ReactNode;
	field: ControllerRenderProps<S>;
};

export function CustomFieldWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, containerClassName, fieldState, children, field, isOptional = false, labelClassName }: Props<S>) {
	return (
		<Field data-invalid={fieldState.invalid} aria-invalid={fieldState.invalid} className={cn("relative space-y-1.5 w-full", containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className={cn("text-[13px] font-semibold text-slate-700 dark:text-zinc-300", labelClassName)}>
				{fieldTitle}
				{isOptional && <span className="text-slate-500 dark:text-zinc-500">(Optional)</span>}
			</FieldLabel>

			{children}

			{fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-[11px] font-medium text-destructive mt-1.5 block" />}
		</Field>
	);
}
