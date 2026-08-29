'use client'

import { useState, useCallback, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useQueryClient } from '@tanstack/react-query' // 🔥 NEW: Caching sync
import { toast } from 'sonner'
import {
	Key,
	ShieldCheck,
	Mail,
	EyeOff,
	Copy,
	Check,
	Loader2,
	ShieldAlert,
	X,
	Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Custom Components
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { Button } from '@/components/ui/button'

// Actions & Schemas
import { grantStaffSystemAccessAction } from '@/actions/team/staff-settings/grant-staff-access'
import { revokeStaffSystemAccessAction } from '@/actions/team/staff-settings/revoke-staff-access'
import { StaffDossierDTO } from '@/schema/composed/team/staff-dossier.dtos'
import { LabRole } from '@/schema/base/enums.base'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	GrantStaffSystemAccessInput,
	GrantStaffSystemAccessInputSchema,
} from '@/schema/composed/team/staff-settings.schema'

interface Props {
	initialData: NonNullable<StaffDossierDTO['access']> & { staffId: string }
	currentUserRole: LabRole
}

const SYSTEM_ROLE_OPTIONS = [
	{ id: 'STAFF', label: 'Staff', desc: 'Basic production floor entry' },
	{ id: 'MANAGER', label: 'Manager', desc: 'Full case routing & HR tools' },
	{ id: 'ADMIN', label: 'Admin', desc: 'Billing & system configuration' },
]

export function StaffSecurityCard({ initialData, currentUserRole }: Props) {
	const queryClient = useQueryClient()
	const [copied, setCopied] = useState(false)
	const [issuedInviteToken, setIssuedInviteToken] = useState<string | null>(null)

	// --- 1. PROACTIVE PENDING STATE (Lockout Guard) ---
	const isAuthorizedToEdit =
		currentUserRole === 'OWNER' ||
		currentUserRole === 'ADMIN'
	const assignableRoles =
		currentUserRole === 'OWNER'
			? SYSTEM_ROLE_OPTIONS
			: SYSTEM_ROLE_OPTIONS.filter((option) => option.id === 'STAFF')

	// ── 2. DERIVED STATE (NO STATE DRIFT VULNERABILITY) ──────────────────
	// We read directly from the query-cached initialData.
	// No duplicated local useState states exist [1].
	const accessState = initialData.accessState
	const systemRole = initialData.systemRole
	const inviteEmail = initialData.inviteEmail
	// Local form used strictly for the "Grant Access" setup fields
	const grantForm = useForm<GrantStaffSystemAccessInput>({
		resolver: zodResolver(GrantStaffSystemAccessInputSchema),
		defaultValues: {
			staffId: initialData.staffId,
			email: '',
			roleToGrant: 'STAFF',
		},
		mode: 'onBlur',
	})

	// URL Builder for copy action
	const inviteUrl = useMemo(() => {
		if (typeof window === 'undefined' || !issuedInviteToken) return ''
		return `${window.location.origin}/invite/${issuedInviteToken}`
	}, [issuedInviteToken])

	// ── SERVER ACTIONS ─────────────────────────────────────────────

	// A. Grant Access Action
	const { executeAsync: executeGrant, isExecuting: isGranting } = useAction(
		grantStaffSystemAccessAction,
		{
			onSuccess: ({ data }) => {
				toast.success('System invitation successfully dispatched.')
				setIssuedInviteToken(data.invite.token)

				// Optimistic Cache Update
				queryClient.setQueryData<StaffDossierDTO>(
					['staff-details', initialData.staffId],
					(old) => {
						if (!old) return old
						return {
							...old,
							access: {
								accessState: 'PENDING_INVITE',
								inviteEmail: data.invite.email,
								systemRole: grantForm.getValues('roleToGrant'),
							},
						}
					},
				)

				grantForm.reset({
					staffId: initialData.staffId,
					email: '',
					roleToGrant: 'STAFF',
				})
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	// B. Revoke Access Action
	const { executeAsync: executeRevoke, isExecuting: isRevoking } = useAction(
		revokeStaffSystemAccessAction,
		{
			onSuccess: () => {
				toast.success('Portal credentials successfully revoked.')
				setIssuedInviteToken(null)

				// Optimistic Cache Update
				queryClient.setQueryData<StaffDossierDTO>(
					['staff-details', initialData.staffId],
					(old) => {
						if (!old) return old
						return {
							...old,
							access: {
								accessState: 'NO_ACCESS',
								systemRole: null,
								inviteEmail: null,
							},
						}
					},
				)

				grantForm.reset()
			},
			onError: ({ error }) => {
				if (error.serverError) {
					toast.error('Operation Aborted', {
						description: error.serverError.message,
					})
				} else {
					handleSafeActionError(error)
				}
			},
		},
	)

	// Global write lock to prevent race conditions during database mutations

	const isPending = isGranting || isRevoking

	// ── 4. HANDLERS ──────────────────────────────────────────────────
	// ── HANDLERS ──────────────────────────────────────────────────
	const handleCopy = useCallback(() => {
		if (!inviteUrl) return
		navigator.clipboard.writeText(inviteUrl)
		setCopied(true)
		toast.success('Invitation link secured to clipboard.')
		setTimeout(() => setCopied(false), 2000)
	}, [inviteUrl])

	const onGrantSubmit = async (data: GrantStaffSystemAccessInput) => {
		await executeGrant(data)
	}

	const onRevokeClick = async () => {
		await executeRevoke({ staffId: initialData.staffId })
	}

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300 border-ai/10 bg-ai/1">
			{/* Ambient AI Glow */}
			<div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-ai/5 blur-3xl pointer-events-none group-hover:bg-ai/10 transition-colors duration-1000" />

			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-ai/10 flex items-center justify-center text-ai shadow-sm border border-ai/20">
						<Key className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">
							System Credentials & Security
						</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
							Software Seat Manager
						</p>
					</div>
				</div>
			</div>

			{/* --- CARD BODY (POLYMORPHIC STATES) --- */}
			<div className="p-6 sm:p-8 gap-6  relative z-10 flex-1 flex flex-col justify-center">
				{/* ── STATE 1: ACTIVE USER ───────────────────────────────────── */}
				{accessState === 'ACTIVE_USER' && (
					<div className="flex flex-col gap-6  animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
							<ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">
									Portal Access Active
								</span>
								<span className="text-[11px] text-muted-foreground leading-normal">
									Employee can securely log in as{' '}
									<strong className="text-primary font-mono text-xs">
										{systemRole}
									</strong>
									.
								</span>
							</div>
						</div>

						{isAuthorizedToEdit && (
							<Button
								onClick={onRevokeClick}
								disabled={isPending}
								variant="ghost"
								className="w-full rounded-xl h-11 border border-transparent hover:border-destructive/20 text-destructive hover:bg-destructive/10 font-bold text-xs transition-all"
							>
								{isRevoking ? (
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
								) : (
									<X className="w-4 h-4 mr-2" />
								)}
								Revoke Portal Access
							</Button>
						)}
					</div>
				)}

				{/* ── STATE 2: PENDING INVITE ────────────────────────────────── */}
				{accessState === 'PENDING_INVITE' && (
					<div className="flex flex-col gap-6  animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-ai/5 border border-ai/10">
							<Mail className="w-5 h-5 text-ai shrink-0 mt-0.5 animate-pulse" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">
									Invitation Pending
								</span>
								<span className="text-[11px] text-muted-foreground leading-normal">
									Onboarding link dispatched to{' '}
									<strong className="text-ai font-medium">{inviteEmail}</strong>
									.
								</span>
							</div>
						</div>

						{/* Bearer links are shown only in the command response that issued them. */}
						{inviteUrl ? (
							<div className="flex flex-col gap-2">
								<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
									New secure invite link
								</span>
								<div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-[#121214] border border-border rounded-xl">
									<input
										title="Invite URL"
										type="text"
										readOnly
										value={inviteUrl}
										className="flex-1 bg-transparent border-none outline-none pl-3 text-xs font-mono text-muted-foreground truncate"
									/>
									<Button
										type="button"
										onClick={handleCopy}
										className={cn(
											'rounded-lg h-8 font-bold text-[10px] shrink-0 transition-all px-3 uppercase tracking-wider',
											copied
												? 'bg-emerald-500 text-white shadow-sm'
												: 'bg-primary text-primary-foreground',
										)}
									>
										{copied ? (
											<Check className="w-3.5 h-3.5" />
										) : (
											<Copy className="w-3.5 h-3.5 mr-1.5" />
										)}
										{copied ? 'Copied' : 'Copy'}
									</Button>
								</div>
							</div>
						) : (
							<p className="text-[10px] text-muted-foreground rounded-xl border border-border bg-slate-50 dark:bg-white/2 p-3 leading-relaxed">
								For security, an invitation link is shown only when it is newly issued.
							</p>
						)}

						{isAuthorizedToEdit && (
							<Button
								onClick={onRevokeClick}
								disabled={isPending}
								variant="ghost"
								className="w-full rounded-xl h-11 border border-transparent hover:border-destructive/20 text-destructive hover:bg-destructive/10 font-bold text-xs transition-all"
							>
								{isRevoking ? (
									<Loader2 className="w-4 h-4 animate-spin mr-2" />
								) : (
									<X className="w-4 h-4 mr-2" />
								)}
								Cancel Invitation
							</Button>
						)}
					</div>
				)}

				{/* ── STATE 3: NO ACCESS ────────────────────────────────────── */}
				{accessState === 'NO_ACCESS' && (
					<div className="flex flex-col gap-6  animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border">
							<EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">
									No Portal Access
								</span>
								<span className="text-[11px] text-muted-foreground leading-normal">
									This employee does not have credentials to log into LabOS.
								</span>
							</div>
						</div>

						{isAuthorizedToEdit ? (
							/* Interactive Setup Form */
							<div className="flex flex-col gap-6  pt-2 border-t border-border border-dashed">
								<div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ai">
									<Sparkles className="w-3.5 h-3.5 animate-pulse" /> Setup
									System Access
								</div>

								{/* FIX: Explicit form ID & action linking prevents parent form collisions [2] */}
								<form
									id="grant-access-form"
									onSubmit={grantForm.handleSubmit(onGrantSubmit)}
									className="flex flex-col gap-5"
								>
									<Controller
										control={grantForm.control}
										name="email"
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												fieldTitle="System Email"
												nameInSchema="email"
												placeholder="employee@email.com"
												disabled={isPending}
												autoComplete="email"
											/>
										)}
									/>

									<Controller
										control={grantForm.control}
										name="roleToGrant"
										render={({ field, fieldState }) => (
											<CustomFieldWithLabel
												field={field}
												fieldState={fieldState}
												nameInSchema="roleToGrant"
												fieldTitle="Assigned System Permission"
											>
												{/* ACCESSIBILITY FIX: Wrapped in semantic role="radiogroup" [3] */}
												<div
													role="radiogroup"
													aria-label="Software access levels"
													className="flex flex-col gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border w-full"
												>
												{assignableRoles.map((opt) => {
														const isChecked = field.value === opt.id
														return (
															<button
																key={opt.id}
																id="roleToGrant"
																type="button"
																role="radio" // ACCESSIBILITY FIX [3]
														aria-checked={isChecked} // ACCESSIBILITY FIX [3]
																disabled={isPending}
																onClick={() => field.onChange(opt.id)}
																className={cn(
																	'py-2.5 px-4 rounded-lg text-xs font-bold transition-all text-left flex flex-col gap-0.5 outline-none focus-visible:ring-1 focus-visible:ring-ai',
																	isChecked
																		? 'bg-white dark:bg-[#121214] text-ai shadow-sm ring-1 ring-border'
																		: 'text-muted-foreground hover:text-foreground',
																	isPending && 'opacity-50 cursor-not-allowed',
																)}
															>
																<span>{opt.label}</span>
																<span className="text-[9px] font-normal tracking-normal lowercase">
																	{opt.desc}
																</span>
															</button>
														)
													})}
												</div>
											</CustomFieldWithLabel>
										)}
									/>

									{/* FIX: Explicitly bound button target to form ID [2] */}
									<Button
										type="submit"
										form="grant-access-form"
										disabled={isPending || !grantForm.formState.isDirty}
										className="w-full h-11 rounded-xl bg-ai hover:bg-ai/90 text-white shadow-ai-glow-dark font-bold text-xs transition-all flex items-center justify-center gap-2 mt-4"
									>
										{isGranting ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<Key className="w-4 h-4" />
										)}
										Grant Software License
									</Button>
								</form>
							</div>
						) : (
							<div className="p-3.5 rounded-xl bg-destructive/5 border border-destructive/10 flex gap-2 items-start text-xs font-medium text-destructive">
								<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
								<span>
									You must be an Owner, Manager, or Admin to grant software
									permissions.
								</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
