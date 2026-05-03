"use client";

import { Control, useWatch } from "react-hook-form";
import { UserCircle, Briefcase, GraduationCap, MapPin, Stethoscope, QrCode, Hospital } from "lucide-react";
import { CreateCompleteClinicInput } from "@/schema/composed/clinic.details";
import { cn } from "@/lib/utils";

const getClinicIcon = (type: string) => {
	switch (type) {
		case "SOLO":
			return <UserCircle className="w-5.5 h-5.5" />;
		case "HOSPITAL":
			return <Hospital className="w-5.5 h-5.5" />;
		case "UNIVERSITY":
			return <GraduationCap className="w-5.5 h-5.5" />;
		default:
			return <Briefcase className="w-5.5 h-5.5" />;
	}
};

interface Props {
	control: Control<CreateCompleteClinicInput>;
}

export function LivePartnerDossier({ control }: Props) {
	const name = useWatch({ control, name: "name" });
	const type = useWatch({ control, name: "type" }) || "CLINIC";
	const city = useWatch({ control, name: "city" });
	const dentistName = useWatch({ control, name: "primaryDentist.name" });

	return (
		<div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-[#121214] animate-in fade-in slide-in-from-right-4 duration-700">
			{/* Holographic / Physical Card Background Effects */}
			<div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-primary)_0%,transparent_40%)] opacity-20" />
			<div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
			<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

			{/* Card Content */}
			<div className="relative z-10 w-full h-full flex flex-col p-6 sm:p-8">
				{/* Header: Icon & Badge */}
				<div className="flex items-center justify-between mb-5">
					<div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner backdrop-blur-md">{getClinicIcon(type)}</div>
					<div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-widest">Official Lab Partner</div>
				</div>

				{/* Middle: Clinic Identity */}
				<div className="space-y-2 mb-6">
					<h3 className={cn("text-2xl font-bold tracking-tight line-clamp-2", name ? "text-white" : "text-white/30 italic")}>{name || "Clinic Name Pending..."}</h3>
					<div className="flex items-center gap-1.5 text-xs font-medium text-white/60 uppercase tracking-widest">
						<MapPin className="w-3.5 h-3.5" />
						{city ? city : "City Unassigned"}
					</div>
				</div>

				{/* Footer: Dentist & QR */}
				<div className="flex items-end justify-between pt-5 border-t border-white/10 mt-auto">
					<div className="space-y-1">
						<p className="text-[9px] text-white/50 font-bold uppercase tracking-widest flex items-center gap-1.5">
							<Stethoscope className="w-3 h-3" /> Lead Practitioner
						</p>
						<p className={cn("text-[11px] font-bold truncate max-w-[200px]", dentistName ? "text-foreground" : "text-foreground/30 italic")}>
							{dentistName ? `Dr. ${dentistName}` : "Awaiting Practitioner"}
						</p>
					</div>
					<div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
						<QrCode className="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
}
