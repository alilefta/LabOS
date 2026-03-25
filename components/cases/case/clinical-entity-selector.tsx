"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Search, Plus, UserPlus, Building2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Entity {
	id: string;
	name: string;
	subtext?: string;
}

interface Props {
	entities: Entity[];
	placeholder: string;
	onSelect: (id: string) => void;
	onCreateNew: () => void;
	icon: LucideIcon;
	label: string;
}

export function ClinicalEntitySelector({ entities, placeholder, onSelect, onCreateNew, icon: Icon, label }: Props) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<div className="flex flex-col gap-2">
			<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">{label}</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full h-12 justify-between rounded-xl border-border bg-card px-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
					>
						<div className="flex items-center gap-3">
							<Icon className="w-4 h-4 text-slate-400" />
							<span className={cn("text-sm", !value && "text-muted-foreground")}>{value ? entities.find((e) => e.name === value)?.name : placeholder}</span>
						</div>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl border-border shadow-premium overflow-hidden">
					<Command className="dark:bg-[#121214]">
						<CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="h-11" />
						<CommandList className="max-h-64 custom-scrollbar">
							<CommandEmpty className="p-4 text-center">
								<p className="text-xs text-muted-foreground mb-3">No {label.toLowerCase()} found.</p>
								<Button
									size="sm"
									onClick={() => {
										setOpen(false);
										onCreateNew();
									}}
									className="w-full rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 h-9 font-bold"
								>
									<Plus className="w-3.5 h-3.5 mr-2" />
									Add New {label}
								</Button>
							</CommandEmpty>
							<CommandGroup>
								{entities.map((entity) => (
									<CommandItem
										key={entity.id}
										value={entity.name}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											onSelect(entity.id);
											setOpen(false);
										}}
										className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group"
									>
										<div className="flex flex-col">
											<span className="text-sm font-bold text-foreground">{entity.name}</span>
											{entity.subtext && <span className="text-[11px] text-muted-foreground font-mono">{entity.subtext}</span>}
										</div>
										<Check className={cn("h-4 w-4 text-primary transition-opacity", value === entity.name ? "opacity-100" : "opacity-0")} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						<div className="p-2 border-t border-border bg-slate-50/50 dark:bg-white/2">
							<Button
								variant="ghost"
								onClick={() => {
									setOpen(false);
									onCreateNew();
								}}
								className="w-full justify-start text-[11px] font-bold text-primary hover:bg-primary/5 h-8 rounded-lg"
							>
								<Plus className="w-3.5 h-3.5 mr-2" />
								New {label} Entry
							</Button>
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
