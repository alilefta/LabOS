"use client";

import { Building2, MapPin, ChevronsUpDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ClinicSelector({ clinics, onSelect }: any) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<div className="space-y-2">
			<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Clinic Partner</label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" className="w-full h-12 justify-between rounded-xl border-border bg-card px-4">
						<div className="flex items-center gap-3">
							<Building2 className="w-4 h-4 text-slate-400" />
							<span className={cn("text-sm", !value && "text-muted-foreground")}>{value ? clinics.find((c: any) => c.name === value)?.name : "Select Clinic..."}</span>
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl border-border shadow-premium overflow-hidden">
					<Command className="dark:bg-[#121214]">
						<CommandInput placeholder="Search clinics..." />
						<CommandList>
							<CommandGroup>
								{clinics.map((clinic: any) => (
									<CommandItem
										key={clinic.id}
										value={clinic.name}
										onSelect={(v) => {
											setValue(v);
											onSelect(clinic.id);
											setOpen(false);
										}}
										className="flex flex-col items-start py-3 px-4 cursor-pointer hover:bg-primary/5"
									>
										<span className="text-sm font-bold text-foreground">{clinic.name}</span>
										<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 mt-0.5 font-medium">
											<MapPin className="w-2.5 h-2.5" /> {clinic.city}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
