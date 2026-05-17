import Link from "next/link";
import { ChevronLeft, Edit3, MoreVertical, Download, Mail, Phone, Building2, UserCircle, Hospital, GraduationCap, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getClinicDetailsById } from "@/data/clinics/get-clinic";
import { ClinicBase } from "@/schema/base/clinic.base";

const getClinicIcon = (type: string) => {
	switch (type) {
		case "SOLO":
			return <UserCircle className="w-5 h-5" />;
		case "HOSPITAL":
			return <Hospital className="w-5 h-5" />;
		case "UNIVERSITY":
			return <GraduationCap className="w-5 h-5" />;
		default:
			return <Building2 className="w-5 h-5" />;
	}
};

interface Props {
	clinicId: string;
}

export async function ClinicHeaderSection({ clinicId }: Props) {
	const results = await getClinicDetailsById(clinicId);

	if (!results.success) return null;
	const { name, type, status, phoneNumber, email, id } = results.data as ClinicBase;

	const isSuspended = status === "SUSPENDED";
	return (
		<div className="px-6 lg:px-8 w-full max-w-500 mx-auto">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
				{/* LEFT: Identity & Status */}
				<div className="flex items-start gap-4">
					<Link href="/clinics">
						<Button variant="outline" size="icon" className="rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm h-10 w-10">
							<ChevronLeft className="w-5 h-5 text-muted-foreground" />
						</Button>
					</Link>

					<div>
						<div className="flex items-center gap-3 mb-1.5">
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">{getClinicIcon(type)}</div>
							<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{name}</h1>

							{/* Dynamic Status Badge */}
							<span
								className={cn(
									"px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border shadow-sm",
									isSuspended
										? "bg-destructive/10 text-destructive border-destructive/20 animate-pulse"
										: status === "INACTIVE"
											? "bg-slate-100 dark:bg-white/10 text-muted-foreground border-border"
											: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
								)}
							>
								{isSuspended ? "Account Suspended" : status}
							</span>
						</div>

						{/* Contact Meta */}
						<div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-muted-foreground ml-14">
							<span className="font-mono bg-slate-100 dark:bg-white/5 border border-border px-1.5 py-0.5 rounded text-foreground uppercase tracking-widest">
								ID: {id.substring(0, 8)}
							</span>
							<span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
								<Phone className="w-3 h-3" /> {phoneNumber}
							</span>
							<span className="flex items-center gap-1.5 hover:text-foreground cursor-pointer transition-colors">
								<Mail className="w-3 h-3" /> {email}
							</span>
						</div>
					</div>
				</div>

				{/* RIGHT: Quick Actions */}
				<div className="flex items-center gap-2">
					<Button variant="outline" className="rounded-xl border-border h-10 px-4 font-semibold shadow-sm bg-white dark:bg-white/5">
						<Download className="w-4 h-4 mr-2 text-muted-foreground" /> Statement
					</Button>
					<Button className="rounded-xl bg-primary text-primary-foreground h-10 px-6 shadow-premium font-bold hover:bg-primary/90">
						<Link href={`/clinics/${id}/edit`} className="flex gap-1.2">
							<Edit3 className="w-4 h-4 mr-2" /> Edit Profile
						</Link>
					</Button>
					<Button variant="ghost" size="icon" className="rounded-xl border border-transparent hover:border-border h-10 w-10">
						<MoreVertical className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Render Alert if Suspended directly under header */}
			{isSuspended && (
				<div className="mt-6 ml-14 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
					<AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
					<div>
						<h4 className="text-[12px] font-bold text-destructive">Production Hold Active</h4>
						<p className="text-[11px] text-destructive/80 font-medium leading-snug mt-0.5">
							This clinic has exceeded credit terms or was manually suspended. Cases cannot advance to production.
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
