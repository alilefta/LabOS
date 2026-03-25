"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, UserPlus, History, MapPin, Phone, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Mocking your PatientDetails type
interface PatientResult {
	id: string;
	name: string;
	city: string;
	phoneNumber: string;
	lastCaseDate: string;
	totalCases: number;
}

export function PatientSelector({ patients, onSelect, onCreateNew }: any) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("");

	return (
		<div className="flex flex-col gap-2">
			<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Patient Name <span className="text-destructive">*</span>
			</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full h-12 justify-between rounded-xl border-border bg-card px-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm">
						<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>{selectedId ? patients.find((p: any) => p.id === selectedId)?.name : "Search or Add Patient..."}</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-2xl border-border shadow-premium overflow-hidden">
					<Command className="dark:bg-[#121214]">
						<CommandInput placeholder="Type patient name..." className="h-11" />
						<CommandList className="max-h-80 custom-scrollbar">
							<CommandEmpty className="p-4 text-center">
								<p className="text-xs text-muted-foreground mb-3">No patient found with that name.</p>
								<Button
									size="sm"
									onClick={() => {
										setOpen(false);
										onCreateNew();
									}}
									className="w-full rounded-xl bg-primary text-white font-bold h-9"
								>
									<UserPlus className="w-3.5 h-3.5 mr-2" /> Register New Patient
								</Button>
							</CommandEmpty>

							<CommandGroup heading="Recent & Matching Patients">
								{patients.map((patient: any) => (
									<HoverCard key={patient.id} openDelay={200}>
										<HoverCardTrigger asChild>
											<CommandItem
												value={patient.name}
												onSelect={() => {
													setSelectedId(patient.id);
													onSelect(patient.id);
													setOpen(false);
												}}
												className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group"
											>
												<div className="flex flex-col">
													<span className="text-sm font-bold text-foreground">{patient.name}</span>
													<div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter mt-0.5">
														<span className="flex items-center gap-1">
															<MapPin className="w-2.5 h-2.5" /> {patient.city}
														</span>
														<span className="flex items-center gap-1">
															<Phone className="w-2.5 h-2.5" /> {patient.phoneNumber}
														</span>
													</div>
												</div>
												{selectedId === patient.id && <Check className="h-4 w-4 text-primary" />}
											</CommandItem>
										</HoverCardTrigger>

										{/* THE IDENTITY VERIFICATION CARD */}
										<HoverCardContent side="right" align="start" className="w-80 p-0 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden z-50">
											<div className="p-4 bg-linear-to-br from-primary/10 to-transparent border-b border-border">
												<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Clinical Identity</p>
												<h4 className="text-lg font-bold text-foreground">{patient.name}</h4>
												<p className="text-xs text-muted-foreground">
													{patient.address1}, {patient.city}
												</p>
											</div>
											<div className="p-4 space-y-4">
												<div>
													<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
														<History className="w-3 h-3" /> Recent Case History
													</p>
													<div className="space-y-2">
														{patient.case.slice(0, 2).map((c: any) => (
															<div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-border">
																<span className="text-[11px] font-mono font-bold text-foreground">#{c.id.substring(0, 8)}</span>
																<span
																	className={cn(
																		"text-[9px] font-bold px-1.5 py-0.5 rounded-md",
																		c.status === "DELIEVERD" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary",
																	)}
																>
																	{c.status}
																</span>
															</div>
														))}
														{patient.case.length === 0 && <p className="text-[11px] italic text-muted-foreground">No previous cases found.</p>}
													</div>
												</div>
												<div className="pt-2 border-t border-border flex justify-between items-center">
													<span className="text-[10px] font-bold text-muted-foreground uppercase">Total Lifetime Cases</span>
													<span className="text-sm font-mono font-bold text-foreground">{patient.case.length}</span>
												</div>
											</div>
										</HoverCardContent>
									</HoverCard>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
