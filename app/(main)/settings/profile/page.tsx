"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, ShieldAlert, UploadCloud, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { toast } from "sonner";

// Zod schema strictly for Profile updates
const ProfileSchema = z.object({
	name: z.string().min(2, "Name is required"),
	phoneNumber: z.string().optional(),
	secondaryEmail: z.string().email().optional().or(z.literal("")),
});
type ProfileInput = z.infer<typeof ProfileSchema>;

export default function ProfileSettingsPage() {
	// In reality, these defaultValues would come from your authenticated LabUser query
	const form = useForm<ProfileInput>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: "Sarah Jenkins",
			phoneNumber: "+964 750 000 0000",
			secondaryEmail: "",
		},
	});

	const isUpdating = false; // Bind to next-safe-action isExecuting later

	const onSubmit = async (data: ProfileInput) => {
		// await updateProfile(data);
		toast.success("Profile updated successfully");
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* SECTION 1: Public Profile */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
						<User className="w-4 h-4" />
					</div>
					<div>
						<h2 className="text-lg font-bold text-foreground tracking-tight">Public Profile</h2>
						<p className="text-sm text-muted-foreground mt-0.5">This is how you appear to other members of your lab.</p>
					</div>
				</div>

				<div className="p-8">
					{/* Avatar Upload UI (Simulated for personal profile) */}
					<div className="flex items-center gap-6 mb-8">
						<div className="w-20 h-20 rounded-full border border-border bg-slate-50 dark:bg-[#121214] flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
							<img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
							<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<UploadCloud className="w-6 h-6 text-foreground" />
							</div>
						</div>
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-1">Profile Picture</h3>
							<p className="text-xs text-muted-foreground mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
							<div className="flex gap-3">
								<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-medium border-border hover:bg-secondary">
									Change
								</Button>
								<Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-medium text-destructive hover:text-destructive hover:bg-destructive/10">
									Remove
								</Button>
							</div>
						</div>
					</div>

					<form onSubmit={form.handleSubmit(onSubmit)} id="profile-form" className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Full Name" nameInSchema="name" />}
							/>
							<Controller
								control={form.control}
								name="phoneNumber"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Phone Number" nameInSchema="phoneNumber" />}
							/>
						</div>
					</form>
				</div>

				<div className="px-8 py-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
					<Button
						type="submit"
						form="profile-form"
						disabled={isUpdating || !form.formState.isDirty}
						className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
					>
						{isUpdating ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
							</>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
			</div>

			{/* SECTION 2: Account Emails */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
						<Mail className="w-4 h-4" />
					</div>
					<div>
						<h2 className="text-lg font-bold text-foreground tracking-tight">Email Addresses</h2>
						<p className="text-sm text-muted-foreground mt-0.5">Manage the email addresses associated with your account.</p>
					</div>
				</div>

				<div className="p-8 space-y-6">
					<div>
						<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 mb-1.5 block">Primary Email (Used for Login)</label>
						<div className="flex items-center justify-between p-3 border border-border rounded-xl bg-slate-50 dark:bg-white/[0.02]">
							<span className="text-sm text-foreground font-medium">sarah.jenkins@dentafusion.com</span>
							<span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">Verified</span>
						</div>
					</div>

					<Controller
						control={form.control}
						name="secondaryEmail"
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Backup / Secondary Email" nameInSchema="secondaryEmail" placeholder="sarah.personal@gmail.com" />
						)}
					/>
				</div>

				<div className="px-8 py-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
					<Button
						type="submit"
						form="profile-form"
						disabled={isUpdating || !form.formState.isDirty}
						className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
					>
						Save Email Preferences
					</Button>
				</div>
			</div>

			{/* SECTION 3: Danger Zone */}
			<div className="lab-card border-destructive/20 overflow-hidden relative">
				{/* Subtle red glow in the background */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

				<div className="px-8 py-6 border-b border-destructive/10 bg-destructive/5 flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
						<ShieldAlert className="w-4 h-4" />
					</div>
					<div>
						<h2 className="text-lg font-bold text-destructive tracking-tight">Danger Zone</h2>
						<p className="text-sm text-destructive/80 mt-0.5">Irreversible actions regarding your personal account.</p>
					</div>
				</div>

				<div className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
					<div>
						<h3 className="text-sm font-bold text-foreground mb-1">Delete Account</h3>
						<p className="text-sm text-muted-foreground">Permanently remove your personal account and all associated data. This will not delete the Workspace if other admins exist.</p>
					</div>
					<Button variant="destructive" className="rounded-xl font-semibold shadow-sm flex-shrink-0">
						Delete Account
					</Button>
				</div>
			</div>
		</div>
	);
}
