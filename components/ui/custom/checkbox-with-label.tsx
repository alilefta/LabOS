"use client";

import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

// Generic S for Schema
type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	className?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	disabled?: boolean;
};

export function CheckboxWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, className, fieldState, field, disabled = false, ...props }: Props<S>) {
	return (
		<Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
			<Checkbox {...field} {...props} id={nameInSchema} aria-invalid={fieldState.invalid} className={className} disabled={disabled} />
			<FieldLabel htmlFor={nameInSchema}>{fieldTitle}</FieldLabel>

			{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
		</Field>
	);
}
