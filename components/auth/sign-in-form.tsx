"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import GithubIcon from "@/public/icons/github-mark.svg";
// import GoogleIcon from "@/public/icons/google-icon.svg";
import { SignInUserInput, SignInUserInputSchema } from "@/schema/base/auth.base";
import { useAction } from "next-safe-action/hooks";
import { signInAction } from "@/actions/auth";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { SIGN_IN_CALLBACK_URL } from "@/lib/urls";
import { InputWithLabel } from "../ui/custom/input-with-label";
import { CheckboxWithLabel } from "../ui/custom/checkbox-with-label";
import { PasswordInputWithLabel } from "../ui/custom/password-input-with-label";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export function SignInForm() {
	const router = useRouter();

	const form = useForm<SignInUserInput>({
		resolver: zodResolver(SignInUserInputSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		mode: "onBlur",
	});

	const { executeAsync: signIn, isExecuting: isLoggingIn } = useAction(signInAction, {
		onSuccess: ({ data }) => {
			if (data) {
				const { result } = data;
				if (result.redirect) router.push(result.url ?? SIGN_IN_CALLBACK_URL);
			}
		},
		onError: ({ error }) => {
			if (error.validationErrors) {
				const { email: emailError, password: passwordError } = error.validationErrors;
				if (emailError) {
					form.setError("email", { message: emailError._errors?.join(", ") });
				}
				if (passwordError) {
					form.setError("password", { message: passwordError._errors?.join(", ") });
				}
			}

			if (error.thrownError) {
				toast.error(error.thrownError.message);
				// console.error("thrown Error:", error.thrownError.message);
			}
			if (error.serverError) {
				toast.error(error.serverError);
				// console.error("server Error:", error.serverError);
				form.setError("root", {
					message: error.serverError,
				});
			}

			handleSafeActionError<typeof signInAction>(error);
		},
	});

	async function onSubmit(data: SignInUserInput) {
		await signIn(data);
	}

	async function SignInWithGithub() {
		await authClient.signIn.social(
			{
				provider: "github",
			},
			{
				onError(ctx) {
					console.log(ctx);
					toast.error(ctx.error.message);
				},
				onSuccess() {
					toast.success("You have logged in successfully via Github!");
					router.push("/dashboard");
				},
			},
		);
	}
	async function SignInWithGoogle() {
		await authClient.signIn.social(
			{
				provider: "google",
			},
			{
				onError(ctx) {
					console.log(ctx);
					toast.error(ctx.error.message);
				},
				onSuccess() {
					toast.success("You have logged in successfully via Google!");
					router.push("/dashboard");
				},
			},
		);
	}

	const isDirty = form.formState.dirtyFields.email && form.formState.dirtyFields.password;

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle className="text-4xl mx-auto">Sign In</CardTitle>
				<CardDescription className="my-3">Login into your accout using Email/Password or use SSO.</CardDescription>

				{form.formState.errors.root && (
					<div className="text-red-500 text-sm bg-red-100 px-4 py-4 rounded-xl">
						<p>{form.formState.errors.root.message}</p>
					</div>
				)}
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} id="login-form">
					<FieldGroup>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<InputWithLabel type="email" field={field} placeholder="example@example.com" fieldState={fieldState} nameInSchema="email" fieldTitle="Email" />
							)}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => <PasswordInputWithLabel field={field} fieldState={fieldState} placeholder="Password" nameInSchema="password" fieldTitle="Password" />}
						/>

						<Controller
							name="rememberMe"
							control={form.control}
							render={({ field, fieldState }) => <CheckboxWithLabel nameInSchema="rememberMe" field={field} fieldState={fieldState} fieldTitle="Remember Me?" />}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex items-center flex-col">
				<Field orientation={"vertical"}>
					<Field orientation="horizontal">
						<Button type="submit" form="login-form" className="w-full py-6" disabled={isLoggingIn || !isDirty}>
							{isLoggingIn ? (
								<>
									<LoaderCircle className="animate-spin" />
									Signing In
								</>
							) : (
								"Sign In"
							)}
						</Button>
					</Field>
				</Field>

				<Field className="gap-6 my-10">
					<FieldSeparator>Or Continue With</FieldSeparator>

					<FieldContent>
						<Button className="cursor-pointer bg-neutral-100 hover:bg-neutral-100 hover:border-2 text-neutral-800 border shadow-md shadow-neutral-800" onClick={() => SignInWithGoogle()}>
							{/* <Image src={GoogleIcon} alt="Github" width={16} height={16} className="bg-neutral-50 rounded-full" /> */}
							Google
						</Button>
						<Button className="bg-neutral-900 hover:bg-neutral-800/90 text-neutral-50 dark:bg-gray-600 cursor-pointer" onClick={() => SignInWithGithub()}>
							{/* <Image src={GithubIcon} alt="Github" width={16} height={16} className="bg-neutral-50 rounded-full" /> */}
							GitHub
						</Button>
					</FieldContent>
				</Field>

				<Field orientation={"responsive"}>
					<Button asChild variant={"link"} size={"sm"}>
						<Link href="/sign-up">Don&#39;t have an account? Sign Up</Link>
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
