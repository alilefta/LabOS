"use client";

import { useState, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { format } from "date-fns";
import { Key, ShieldCheck, Mail, EyeOff, Copy, Check, Loader2, AlertTriangle, ShieldAlert, ArrowRight, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Components
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Button } from "@/components/ui/button";

// Actions & Schemas
import { grantStaffSystemAccessAction } from "@/actions/team/staff-settings/grant-staff-access";
import { revokeStaffSystemAccessAction } from "@/actions/team/staff-settings/revoke-staff-access";
import { StaffDossierDTO, SystemAccessState } from "@/schema/composed/team/staff-dossier.dtos";
import { LabRole } from "@/schema/base/enums.base";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { GrantStaffSystemAccessInput, GrantStaffSystemAccessInputSchema } from "@/schema/composed/team/staff-settings.schema";

interface Props {
	initialData: StaffDossierDTO;
	currentUserRole: LabRole; // Read from the parent Server page session context [2]
}

const SYSTEM_ROLE_OPTIONS = [
	{ id: "STAFF", label: "Staff", desc: "Basic production floor entry" },
	{ id: "MANAGER", label: "Manager", desc: "Full case routing & HR tools" },
	{ id: "ADMIN", label: "Admin", desc: "Billing & system configuration" },
];

export function StaffSecurityCard({ initialData, currentUserRole }: Props) {
	// ── 1. LOCAL TRANSITIONAL STATES ──────────────────────────────────
	const [accessState, setAccessState] = useState<SystemAccessState>(initialData.accessState);
	const [systemRole, setSystemRole] = useState<LabRole | null>(initialData.systemRole);
	const [inviteEmail, setInviteEmail] = useState<string | null>(initialData.inviteEmail);
	const [inviteToken, setInviteToken] = useState<string | null>(initialData.inviteToken);
	const [copied, setCopied] = useState(false);

	// Local form used strictly for the "Grant Access" setup fields [3]
	const grantForm = useForm<GrantStaffSystemAccessInput>({
		resolver: zodResolver(GrantStaffSystemAccessInputSchema),
		defaultValues: {
			staffId: initialData.id,
			email: "",
			roleToGrant: "STAFF",
		},

		mode: "onBlur",
	});

	// URL Builder for copy action
	const inviteUrl = useMemo(() => {
		if (typeof window === "undefined" || !inviteToken) return "";
		return `${window.location.origin}/invite/${inviteToken}`;
	}, [inviteToken]);

	// ── 2. SERVER ACTIONS ─────────────────────────────────────────────

	// A. Grant Access Action
	const { executeAsync: executeGrant, isExecuting: isGranting } = useAction(grantStaffSystemAccessAction, {
		onSuccess: ({ data }) => {
			toast.success("System invitation successfully dispatched.");

			// Transition UI state immediately without page reload (Optimistic UX)
			setAccessState("PENDING_INVITE");
			setInviteEmail(data.invite.email);
			setInviteToken(data.invite.token);
			setSystemRole(grantForm.getValues("roleToGrant"));
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// B. Revoke Access Action
	const { executeAsync: executeRevoke, isExecuting: isRevoking } = useAction(revokeStaffSystemAccessAction, {
		onSuccess: () => {
			toast.success("Portal credentials successfully revoked.");

			// Transition UI state back to No Access
			setAccessState("NO_ACCESS");
			setSystemRole(null);
			setInviteEmail(null);
			setInviteToken(null);
			grantForm.reset(); // Reset the setup form
		},
		onError: ({ error }) => {
			if (error.serverError) {
				toast.error("Operation Aborted", { description: error.serverError.message });
			} else {
				handleSafeActionError(error);
			}
		},
	});

	// ── 3. HANDLERS ──────────────────────────────────────────────────
	const handleCopy = () => {
		if (!inviteUrl) return;
		navigator.clipboard.writeText(inviteUrl);
		setCopied(true);
		toast.success("Invitation link secured to clipboard.");
		setTimeout(() => setCopied(false), 2000);
	};

	const onGrantSubmit = async (data: GrantStaffSystemAccessInput) => {
		await executeGrant(data);
	};

	const onRevokeClick = async () => {
		await executeRevoke({ staffId: initialData.id });
	};

	const isAuthorizedToEdit = currentUserRole === "OWNER" || currentUserRole === "MANAGER";

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300 border-ai/10 bg-ai/[0.01]">
			{/* Ambient AI Glow (Behind the content) */}
			<div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-ai/5 blur-3xl pointer-events-none group-hover:bg-ai/10 transition-colors duration-1000" />

			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-ai/10 flex items-center justify-center text-ai shadow-sm border border-ai/20">
					<Key className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-foreground">System Credentials & Security</h3>
					<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Software Seat Manager</p>
				</div>
			</div>

			{/* --- CARD BODY (POLYMORPHIC STATES) --- */}
			<div className="p-6 sm:p-8 space-y-6 relative z-10 flex-1 flex flex-col justify-center">
				{/* ── STATE 1: ACTIVE USER ───────────────────────────────────── */}
				{accessState === "ACTIVE_USER" && (
					<div className="space-y-6 animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
							<ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-pulse" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">Portal Access Active</span>
								<span className="text-[11px] text-muted-foreground leading-normal">
									Employee can securely log in as <strong className="text-primary font-mono text-xs">{systemRole}</strong>.
								</span>
							</div>
						</div>

						{isAuthorizedToEdit && (
							<Button
								onClick={onRevokeClick}
								disabled={isRevoking}
								variant="ghost"
								className="w-full rounded-xl h-11 border border-transparent hover:border-destructive/20 text-destructive hover:bg-destructive/10 font-bold text-xs transition-all"
							>
								{isRevoking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <X className="w-4 h-4 mr-2" />}
								Revoke Portal Access
							</Button>
						)}
					</div>
				)}

				{/* ── STATE 2: PENDING INVITE ────────────────────────────────── */}
				{accessState === "PENDING_INVITE" && (
					<div className="space-y-6 animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-ai/5 border border-ai/10">
							<Mail className="w-5 h-5 text-ai shrink-0 mt-0.5 animate-pulse" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">Invitation Pending</span>
								<span className="text-[11px] text-muted-foreground leading-normal">
									Onboarding link dispatched to <strong className="text-ai font-medium">{inviteEmail}</strong>.
								</span>
							</div>
						</div>

						{/* Invitation Link Clipboard Area */}
						<div className="space-y-2">
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Secure Invite Link</span>
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
										"rounded-lg h-8 font-bold text-[10px] shrink-0 transition-all px-3 uppercase tracking-wider",
										copied ? "bg-emerald-500 text-white shadow-sm" : "bg-primary text-primary-foreground",
									)}
								>
									{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
									{copied ? "Copied" : "Copy"}
								</Button>
							</div>
						</div>

						{isAuthorizedToEdit && (
							<Button
								onClick={onRevokeClick} // Revoking a pending invite simply deletes it
								disabled={isRevoking}
								variant="ghost"
								className="w-full rounded-xl h-11 border border-transparent hover:border-destructive/20 text-destructive hover:bg-destructive/10 font-bold text-xs transition-all"
							>
								{isRevoking ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <X className="w-4 h-4 mr-2" />}
								Cancel Invitation
							</Button>
						)}
					</div>
				)}

				{/* ── STATE 3: NO ACCESS (Awaiting setup) ────────────────────── */}
				{accessState === "NO_ACCESS" && (
					<div className="space-y-6 animate-in fade-in duration-500 w-full">
						<div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-border">
							<EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
							<div className="flex flex-col gap-0.5">
								<span className="text-[13px] font-bold text-foreground">No Portal Access</span>
								<span className="text-[11px] text-muted-foreground leading-normal">This employee does not have credentials to log into LabOS.</span>
							</div>
						</div>

						{isAuthorizedToEdit ? (
							/* Interactive Setup Form */
							<div className="space-y-6 pt-2 border-t border-border border-dashed">
								<div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ai">
									<Sparkles className="w-3.5 h-3.5 animate-pulse" /> Setup System Access
								</div>

								<form id="grant-access-form" onSubmit={grantForm.handleSubmit(onGrantSubmit)} className="space-y-5">
									<Controller
										control={grantForm.control}
										name="email"
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="System Email" nameInSchema="email" placeholder="employee@email.com" />
										)}
									/>

									<Controller
										control={grantForm.control}
										name="roleToGrant"
										render={({ field, fieldState }) => (
											<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="roleToGrant" fieldTitle="Assigned System Permission">
												<div className="flex flex-col gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border w-full">
													{SYSTEM_ROLE_OPTIONS.map((opt) => (
														<button
															key={opt.id}
															type="button"
															onClick={() => field.onChange(opt.id)}
															className={cn(
																"py-2.5 px-4 rounded-lg text-xs font-bold transition-all text-left flex flex-col gap-0.5",
																field.value === opt.id
																	? "bg-white dark:bg-[#121214] text-ai shadow-sm ring-1 ring-border"
																	: "text-muted-foreground hover:text-foreground",
															)}
														>
															<span>{opt.label}</span>
															<span className="text-[9px] font-normal tracking-normal lowercase">{opt.desc}</span>
														</button>
													))}
												</div>
											</CustomFieldWithLabel>
										)}
									/>

									<Button
										type="submit"
										disabled={isGranting || !grantForm.formState.isDirty}
										className="w-full h-11 rounded-xl bg-ai hover:bg-ai/90 text-white shadow-ai-glow-dark font-bold text-xs transition-all flex items-center justify-center gap-2 mt-4"
									>
										{isGranting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
										Grant Software License
									</Button>
								</form>
							</div>
						) : (
							<div className="p-3.5 rounded-xl bg-destructive/5 border border-destructive/10 flex gap-2 items-start text-xs font-medium text-destructive">
								<ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
								<span>You must be an Owner or Manager to grant software permissions.</span>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
