'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Building, Loader2 } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { memo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createLabWorkspace } from '@/actions/lab'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	CreateLabWorkspaceInputSchema,
	type CreateLabWorkspaceInput,
} from '@/schema/composed/lab.details'

import { Button } from '../ui/button'
import { InputWithLabel } from '../ui/custom/input-with-label'
import { LabLogoUpload } from './lab-logo-upload'

/**
 * Collects only the Lab workspace data required by Organization-backed
 * onboarding. Operational staff details are intentionally excluded because an
 * Organization owner does not necessarily have a LabStaff persona.
 */
export const OnboardingForm = memo(function OnboardingForm({
	mode = 'initial',
}: {
	mode?: 'initial' | 'additional'
}) {
	const isAdditionalWorkspace = mode === 'additional'
	const router = useRouter()
	const form = useForm<CreateLabWorkspaceInput>({
		resolver: zodResolver(CreateLabWorkspaceInputSchema),
		defaultValues: {
			lab: {
				title: '',
				slug: '',
				brandAvatarUrl: '',
				subtitle: '',
			},
		},
		mode: 'onBlur',
	})

	const { executeAsync: createWorkspace, isExecuting } = useAction(
		createLabWorkspace,
		{
			onSuccess: ({ data }) => {
				if (data.alreadyExists) {
					toast.message('Your workspace already exists, redirecting...')
				} else {
					toast.success(`Workspace “${data.lab.title}” is ready.`)
				}
				router.push('/dashboard')
				router.refresh()
			},
			onError: ({ error }) => {
				if (error.validationErrors?.lab) {
					const { lab } = error.validationErrors

					if (lab.title) {
						form.setError('lab.title', {
							message: lab.title._errors?.join(', '),
						})
					}
					if (lab.brandAvatarUrl) {
						form.setError('lab.brandAvatarUrl', {
							message: lab.brandAvatarUrl._errors?.join(', '),
						})
					}
					if (lab.slug) {
						form.setError('lab.slug', {
							message: lab.slug._errors?.join(', '),
						})
					}
				}

				if (error.serverError) {
					if (error.serverError.statusCode === 401) {
						router.push('/sign-in')
						return
					}
					form.setError('root', { message: error.serverError.message })
				}

				handleSafeActionError(error)
			},
		},
	)

	return (
		<div className="w-full max-w-xl">
			<div className="mb-8 lg:hidden">
				<div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white shadow-ai-glow">
					L
				</div>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">
					{isAdditionalWorkspace
						? 'Create another workspace'
						: 'Set up your Lab'}
				</h1>
			</div>

			<div className="lab-card overflow-hidden">
				<div className="flex items-center gap-2 border-b border-border bg-slate-50 px-8 py-4 text-sm font-semibold text-primary dark:bg-white/5">
					<Building className="size-4" /> Workspace
				</div>

				<div className="p-8 sm:p-10">
					<FormProvider {...form}>
						<form
							onSubmit={form.handleSubmit((data) => createWorkspace(data))}
							className="space-y-6"
						>
							<div className="mb-8 text-center">
								<h2 className="text-2xl font-bold tracking-tight text-foreground">
									{isAdditionalWorkspace
										? 'New workspace information'
										: 'Workspace information'}
								</h2>
								<p className="mt-1 text-sm text-muted-foreground">
									{isAdditionalWorkspace
										? 'Create a separate Organization and Lab for this account.'
										: 'This is how clinics and team members identify your lab.'}
								</p>
							</div>

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
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Subtitle" nameInSchema="lab.subtitle" placeholder="Premium Dental Restorations" isOptional />
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

							{form.formState.errors.root && (
								<div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive">
									{form.formState.errors.root.message}
								</div>
							)}

							<Button type="submit" disabled={isExecuting} className="h-11 w-full rounded-xl bg-primary text-primary-foreground shadow-premium hover:bg-primary/90">
								{isExecuting ? (
									<><Loader2 className="mr-2 size-4 animate-spin" />Creating workspace…</>
								) : 'Create workspace'}
							</Button>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
})
