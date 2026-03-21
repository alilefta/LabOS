"use client";

import { ControllerFieldState, ControllerRenderProps, FieldValues, FieldPath } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { cx } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "../button";
import { EyeClosed, EyeIcon } from "lucide-react";

// Generic S for Schema
type Props<S extends FieldValues> = {
	fieldTitle: string;
	nameInSchema: FieldPath<S>;
	containerClassName?: string;
	inputClassName?: string;
	fieldState: ControllerFieldState;
	field: ControllerRenderProps<S>;
	placeholder?: string;
	isPassword?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function PasswordInputWithLabel<S extends FieldValues>({ fieldTitle, nameInSchema, inputClassName, containerClassName, fieldState, field, ...props }: Props<S>) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Field data-invalid={fieldState.invalid} className={cn(containerClassName)}>
			<FieldLabel htmlFor={nameInSchema} className="text-sm font-medium dark:text-zinc-400 text-zinc-500">
				{fieldTitle}
			</FieldLabel>

			<div className="relative">
				<Input
					{...field}
					{...props}
					type={showPassword ? "text" : "password"}
					id={nameInSchema}
					aria-invalid={fieldState.invalid}
					autoComplete="current-password"
					className={cn(
						"pr-10", // Glass Style
						"h-11 rounded-xl bg-background/40 border-background/60 text-md text-foreground",
						"dark:placeholder:text-zinc-600 placeholder:text-zinc-400 font-sans shadow-sm transition-all duration-200",

						// Focus State (Indigo Glow)
						"focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0",
						"dark:focus-visible:bg-background/40 focus-visible:bg-background",
						inputClassName,
					)}
				/>
				<Button
					className={cn("absolute right-1 bottom-0 top-1 rounded-full transition-all duration-200 hover:opacity-70 text-zinc-500 dark:text-zinc-500", !fieldState.isDirty && "hidden")}
					variant={"ghost"}
					size={"icon"}
					type="button"
					onClick={() => setShowPassword((p) => !p)}
					aria-label={showPassword ? "Hide password" : "Show password"}
				>
					{showPassword ? <EyeIcon /> : <EyeClosed />}
				</Button>
			</div>
		</Field>
	);
}
