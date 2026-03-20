"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2Icon, LoaderCircle } from "lucide-react";

import GithubIcon from "@/public/icons/github-mark.svg";
import GoogleIcon from "@/public/icons/google-icon.svg";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SignUpUserInput, SignUpUserInputSchema } from "@/schema/base/auth.base";
import { useAction } from "next-safe-action/hooks";
import { signUpAction } from "@/actions/auth";
import { SIGN_UP_CALLBACK_URL } from "@/lib/urls";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { InputWithLabel } from "../ui/custom/input-with-label";
import { PasswordInputWithLabel } from "../ui/custom/password-input-with-label";

export function SignupForm() {
	const router = useRouter();

	const form = useForm<SignUpUserInput>({
		resolver: zodResolver(SignUpUserInputSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const { executeAsync: signUp, isExecuting: isSigningUp } = useAction(signUpAction, {
		onSuccess: ({ data, input }) => {
			if (data) {
				toast.success("You have successfully signed up!");
				router.push("/onboarding");
			}
		},
		onError: ({ error, input }) => {
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

			handleSafeActionError<typeof signUpAction>(error);
		},
	});

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

	const isFormDirty = form.formState.dirtyFields.email && form.formState.dirtyFields.password;

	async function onSubmit(data: SignUpUserInput) {
		await signUp(data);
	}
	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader className="mb-2 gap-4">
				<CardTitle className="text-3xl tracking-tight font-bold mx-auto mb-2">Sign Up</CardTitle>
				<CardDescription>Signup today and be part of fast-changing world.</CardDescription>
				{form.formState.errors.root && <p className="text-red-500 text-sm">{form.formState.errors.root.message}</p>}
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} id="signup-form">
					<FieldGroup>
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} nameInSchema="name" fieldTitle="Name" type="text" placeholder="Your Full Name" />}
						/>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => <InputWithLabel type="email" field={field} fieldState={fieldState} nameInSchema="email" fieldTitle="Email" placeholder="Your Email" />}
						/>

						<Controller
							name="password"
							control={form.control}
							render={({ field, fieldState }) => (
								<PasswordInputWithLabel field={field} fieldState={fieldState} nameInSchema="password" fieldTitle="Password" placeholder="Choose Password" />
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex items-center flex-col">
				<Field orientation={"vertical"}>
					<Field orientation="horizontal" className="w-full">
						<Button type="submit" form="signup-form" className="w-full cursor-pointer" disabled={isSigningUp || !isFormDirty}>
							{isSigningUp ? (
								<>
									<LoaderCircle className="animate-spin" /> Signing Up
								</>
							) : (
								"Sign Up"
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
						<Link href="/sign-in">Already have an account? Sign In</Link>
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
