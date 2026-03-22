"use client";

import { createLabAndLabUser } from "@/actions/lab";
import { CreateLabAndLabUserInput, CreateLabAndLabUserInputSchema } from "@/schema/composed/lab.details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { InputWithLabel } from "../ui/custom/input-with-label";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Building, Loader2, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LabLogoUpload } from "./lab-logo-upload";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function OnboardingForm() {
	const [step, setStep] = useState<1 | 2>(1);

	const router = useRouter();

	const form = useForm<CreateLabAndLabUserInput>({
		resolver: zodResolver(CreateLabAndLabUserInputSchema),
		defaultValues: {
			lab: {
				title: "",
				slug: "",
				brandAvatarUrl: "",
				subtitle: "",
			},
			labUser: {
				name: "",
				avatarUrl: "",
				address1: "",
				address2: "",
				city: "",
				role: "ADMIN",
				phoneNumber: "",
				secondaryEmail: "",
				zipcode: "",
			},
		},

		mode: "onBlur",
	});

	useEffect(() => {
		if (form.formState.errors.lab) {
			toast.error(form.formState.errors.lab.message);
			// console.error(form.formState.errors.lab);
		}
		if (form.formState.errors.labUser) {
			toast.error(form.formState.errors.labUser.message);
			// console.error(form.formState.errors.labUser);
		}

		// if (form.formState.errors.root) {
		// 	toast.error(form.formState.errors.root.message);
		// 	console.error(form.formState.errors.root);
		// }
	}, [form.formState.errors]);

	const { executeAsync: createLab, isExecuting: isCreatingLab } = useAction(createLabAndLabUser, {
		onSuccess: ({ data }) => {
			toast.message(data.alreadyExists ? "Lab already exists, redirecting to your lab." : "Lab created successfully, redirecting...");
			router.push("/dashboard");
		},
		onError: ({ error }) => {
			console.error("onboarding-form-error:", error);
			if (error.validationErrors) {
				const { lab, labUser } = error.validationErrors;

				if (lab) {
					if (lab.title) {
						form.setError("lab.title", { message: lab.title._errors?.join(", ") });
					}
					if (lab.brandAvatarUrl) {
						form.setError("lab.brandAvatarUrl", { message: lab.brandAvatarUrl._errors?.join(", ") });
					}
					if (lab.slug) {
						form.setError("lab.slug", { message: lab.slug._errors?.join(", ") });
					}
				}

				if (labUser) {
					if (labUser.name) {
						form.setError("labUser.name", { message: labUser.name._errors?.join(", ") });
					}
					if (labUser.address1) {
						form.setError("labUser.address1", { message: labUser.address1._errors?.join(", ") });
					}
					if (labUser.city) {
						form.setError("labUser.city", { message: labUser.city._errors?.join(", ") });
					}
					if (labUser.zipcode) {
						form.setError("labUser.zipcode", { message: labUser.zipcode._errors?.join(", ") });
					}
					if (labUser.phoneNumber) {
						form.setError("labUser.phoneNumber", { message: labUser.phoneNumber._errors?.join(", ") });
					}
				}
			}

			if (error.thrownError) {
				toast.error(error.thrownError.message);
				router.refresh();

				// Todo  _logger.logError(some error message to be sent to my audit)
			}
			// ── 2. Server errors: handle specific codes first ─────────────
			if (error.serverError) {
				const { code, statusCode } = error.serverError;

				if (code === "LAB_ALREADY_EXISTS") {
					toast.message("You already have a lab, redirecting...");
					router.push("/dashboard");
					return;
				}

				if (statusCode === 401) {
					router.push("/sign-in");
					return;
				}

				// Set root form error for anything else
				form.setError("root", { message: error.serverError.message });
			}

			// ── 3. Fall through to generic handler for everything else ────
			handleSafeActionError(error);
		},
	});

	const onSubmit = async (data: CreateLabAndLabUserInput) => {
		await createLab(data);
	};

	const nextStep = async () => {
		const isStep1Valid = await form.trigger(["lab.title", "lab.slug", "lab.brandAvatarUrl"]);
		if (isStep1Valid) setStep(2);
	};

	const isFormDirty = form.formState.dirtyFields.labUser?.name && form.formState.dirtyFields.labUser?.city && form.formState.dirtyFields.labUser?.phoneNumber;

	const prevStep = () => setStep(1);
	return (
		<div className="w-full max-w-xl">
			{/* Mobile-only header fallback */}
			<div className="mb-8 lg:hidden">
				<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6 shadow-ai-glow">L</div>
				<h1 className="text-3xl font-bold text-foreground tracking-tight">Setup your Lab</h1>
			</div>

			{/* lab-card provides the pure white (Light) or inner-lit lip (Dark) styling */}
			<div className="lab-card overflow-hidden">
				{/* Interactive Progress Bar Header */}
				<div className="bg-slate-50 dark:bg-white/5 border-b border-border px-8 py-4 flex items-center justify-between">
					<div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === 1 ? "text-primary" : "text-muted-foreground"}`}>
						<Building className="w-4 h-4" /> Workspace
					</div>
					<div className="flex-1 h-px bg-border mx-4"></div>
					<div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${step === 2 ? "text-primary" : "text-muted-foreground"}`}>
						<UserCircle className="w-4 h-4" /> Administrator
					</div>
				</div>

				<div className="p-8 sm:p-10">
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" id="oboarding-form">
							{/* --- STEP 1: LAB DETAILS --- */}
							<div className={step === 1 ? "block animate-in slide-in-from-right-4 fade-in duration-500" : "hidden"}>
								<div className="mb-8 text-center">
									<h2 className="text-2xl font-bold text-foreground tracking-tight">Workspace Info</h2>
									<p className="text-sm text-muted-foreground mt-1">This is how clinics will identify your lab.</p>
								</div>

								{/* THE NEW UPLOAD COMPONENT */}
								<LabLogoUpload />

								<div className="space-y-5">
									<Controller
										control={form.control}
										name="lab.title"
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Lab Name" nameInSchema="lab.title" placeholder="e.g. DentaFusion Labs" />
										)}
									/>

									<Controller
										control={form.control}
										name="lab.subtitle"
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												fieldTitle="Subtitle"
												nameInSchema="lab.subtitle"
												placeholder="Premium Dental Restorations"
												isOptional={true}
											/>
										)}
									/>

									<Controller
										control={form.control}
										name="lab.slug"
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Portal URL Slug" nameInSchema="lab.slug" placeholder="dentafusion" />
										)}
									/>
								</div>

								<div className="mt-10 flex justify-end">
									<Button type="button" onClick={nextStep} className="rounded-xl px-8 shadow-premium group h-11 bg-primary text-primary-foreground hover:bg-primary/90">
										Continue to Profile
										<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
									</Button>
								</div>
							</div>

							{/* --- STEP 2: USER DETAILS --- */}
							<div className={step === 2 ? "block animate-in slide-in-from-right-4 fade-in duration-500" : "hidden"}>
								<div className="mb-8">
									<h2 className="text-2xl font-bold text-foreground tracking-tight">Administrator Profile</h2>
									<p className="text-sm text-muted-foreground mt-1">Set up the primary contact for this lab.</p>
								</div>

								<div className="space-y-5">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<Controller
											control={form.control}
											name="labUser.name"
											render={({ field, fieldState }) => (
												<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Full Name" nameInSchema="labUser.name" placeholder="Sarah Jenkins" />
											)}
										/>

										<Controller
											control={form.control}
											name="labUser.phoneNumber"
											render={({ field, fieldState }) => (
												<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Phone Number" nameInSchema="labUser.phoneNumber" placeholder="+1 (555) 000-0000" />
											)}
										/>
									</div>

									<Controller
										control={form.control}
										name="labUser.secondaryEmail"
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												fieldTitle="Busniess Email"
												nameInSchema="labUser.secondaryEmail"
												placeholder="mylab@mylab.com"
												isOptional={true}
											/>
										)}
									/>

									<Controller
										control={form.control}
										name="labUser.address1"
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												fieldTitle="Street Address"
												nameInSchema="labUser.address1"
												placeholder="123 Dental Way, Suite 1000"
											/>
										)}
									/>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<Controller
											control={form.control}
											name="labUser.city"
											render={({ field, fieldState }) => (
												<InputWithLabel field={field} fieldState={fieldState} fieldTitle="City" nameInSchema="labUser.city" placeholder="New York" />
											)}
										/>

										<Controller
											control={form.control}
											name="labUser.zipcode"
											render={({ field, fieldState }) => (
												<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Zip Code" nameInSchema="labUser.zipcode" placeholder="10001" />
											)}
										/>
									</div>
								</div>
								{form.formState.errors.root && (
									<div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-destructive animate-pulse"></div>
										{form.formState.errors.root.message}
									</div>
								)}

								<div className="mt-10 flex justify-between items-center">
									<Button type="button" variant="ghost" onClick={prevStep} className="rounded-xl h-11 px-6 text-muted-foreground hover:text-foreground hover:bg-secondary">
										<ArrowLeft className="w-4 h-4 mr-2" /> Back
									</Button>

									<Button
										type="submit"
										disabled={isCreatingLab || !isFormDirty}
										form="oboarding-form"
										className="rounded-xl h-11 px-8 shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground"
									>
										{isCreatingLab ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating Lab...
											</>
										) : (
											"Complete Setup"
										)}
									</Button>
								</div>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}
