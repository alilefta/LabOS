"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoaderCircle, Github } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { authClient } from "@/lib/auth-client";
import { signUpAction } from "@/actions/auth";
import { SignUpUserInput, SignUpUserInputSchema } from "@/schema/base/auth.base";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { SIGN_UP_CALLBACK_URL } from "@/lib/urls";

import { Button } from "@/components/ui/button";
import { InputWithLabel } from "../ui/custom/input-with-label";
import { PasswordInputWithLabel } from "../ui/custom/password-input-with-label";

export function SignupForm() {
	const router = useRouter();

	const form = useForm<SignUpUserInput>({
		resolver: zodResolver(SignUpUserInputSchema),
		defaultValues: { name: "", email: "", password: "" },
		mode: "onBlur",
	});

	const { executeAsync: signUp, isExecuting: isSigningUp } = useAction(signUpAction, {
		onSuccess: ({ data }) => {
			if (data) {
				toast.success("Account created successfully!");
				router.push(SIGN_UP_CALLBACK_URL);
			}
		},
		onError: ({ error }) => {
			if (error.validationErrors) {
				const { email: emailError, password: passwordError } = error.validationErrors;
				if (emailError) form.setError("email", { message: emailError._errors?.join(", ") });
				if (passwordError) form.setError("password", { message: passwordError._errors?.join(", ") });
			}
			if (error.thrownError) toast.error(error.thrownError.message);
			if (error.serverError) {
				toast.error(error.serverError.message);
				form.setError("root", { message: error.serverError.message });
			}
			handleSafeActionError(error);
		},
	});

	async function onSubmit(data: SignUpUserInput) {
		await signUp(data);
	}

	async function SignInWithProvider(provider: "github" | "google") {
		await authClient.signIn.social(
			{ provider },
			{
				onError(ctx) {
					toast.error(ctx.error.message);
				},
				onSuccess() {
					toast.success(`Registered successfully via ${provider === "github" ? "GitHub" : "Google"}`);
					router.push("/dashboard");
				},
			},
		);
	}

	const isFormDirty = form.formState.dirtyFields.email && form.formState.dirtyFields.password && form.formState.dirtyFields.name;

	return (
		<div className="relative p-8 sm:p-10 w-full rounded-3xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-[#121214]/60 backdrop-blur-2xl shadow-premium animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Mobile-only logo */}
			<div className="lg:hidden flex items-center justify-center gap-2 mb-8">
				<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-ai-glow">L</div>
				<span className="font-bold text-xl tracking-tight text-foreground">LabOS</span>
			</div>

			<div className="mb-8 text-center lg:text-left">
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">Create an account</h1>
				<p className="text-sm text-muted-foreground">Start managing your lab in minutes.</p>

				{form.formState.errors.root && (
					<div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium flex items-center gap-3 text-left">
						<div className="w-2 h-2 rounded-full bg-destructive animate-pulse"></div>
						{form.formState.errors.root.message}
					</div>
				)}
			</div>

			<form onSubmit={form.handleSubmit(onSubmit)} id="signup-form" className="space-y-5">
				<Controller
					name="name"
					control={form.control}
					render={({ field, fieldState }) => <InputWithLabel type="text" field={field} placeholder="Sarah Jenkins" fieldState={fieldState} nameInSchema="name" fieldTitle="Full Name" />}
				/>

				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<InputWithLabel type="email" field={field} placeholder="admin@dentafusion.com" fieldState={fieldState} nameInSchema="email" fieldTitle="Email Address" />
					)}
				/>

				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<PasswordInputWithLabel field={field} fieldState={fieldState} placeholder="Create a strong password" nameInSchema="password" fieldTitle="Password" />
					)}
				/>

				<Button
					type="submit"
					form="signup-form"
					className="w-full h-11 mt-6 rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
					disabled={isSigningUp || !isFormDirty}
				>
					{isSigningUp ? (
						<>
							<LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
							Creating Account...
						</>
					) : (
						"Sign Up"
					)}
				</Button>
			</form>

			{/* OR Divider */}
			<div className="flex items-center gap-4 my-8">
				<div className="flex-1 h-px bg-border"></div>
				<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Or register with</span>
				<div className="flex-1 h-px bg-border"></div>
			</div>

			{/* Premium Social Sign-In Buttons */}
			<div className="grid grid-cols-2 gap-4">
				<Button
					type="button"
					variant="outline"
					className="h-11 rounded-xl bg-white/50 dark:bg-white/5 border-border hover:bg-white dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all font-medium text-foreground backdrop-blur-sm"
					onClick={() => SignInWithProvider("google")}
				>
					<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
						<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
						<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
						<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
						<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
					</svg>
					Google
				</Button>

				<Button
					type="button"
					variant="outline"
					className="h-11 rounded-xl bg-white/50 dark:bg-white/5 border-border hover:bg-white dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all font-medium text-foreground backdrop-blur-sm"
					onClick={() => SignInWithProvider("github")}
				>
					<Github className="w-4 h-4 mr-2" />
					GitHub
				</Button>
			</div>

			<div className="mt-8 text-center">
				<p className="text-[13px] text-muted-foreground">
					Already have an account?{" "}
					<Link href="/sign-in" className="font-semibold text-foreground hover:text-primary transition-colors">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
