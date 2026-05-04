import { ReactNode } from "react";

interface SplitFormLayoutProps {
	header: ReactNode;
	mainArea: ReactNode;
	sidebar: ReactNode;
}

export function SplitFormLayout({ header, mainArea, sidebar }: SplitFormLayoutProps) {
	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* Global Ambient Glow */}
			<div className="absolute top-0 left-1/4 w-200 h-150 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10 hidden dark:block" />

			{/* --- 1. HEADER SLOT --- */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 pb-4 px-4 sm:px-6 lg:px-8 max-w-400 mx-auto w-full">{header}</div>
			</header>

			{/* --- 2. MAIN WORKSPACE --- */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE (Scrollable Form Container) */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar relative flex flex-col">
						{/* FORM CONTENT SLOT */}
						<div className="flex-1 pt-6 lg:pt-8 pb-8 pr-2">{mainArea}</div>

						{/* MOBILE AUDITOR SLOT (In-flow sticky footer) */}
						<div className="xl:hidden sticky bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto -mx-4 sm:-mx-6 lg:-mx-8">
							{sidebar}
						</div>
					</div>

					{/* RIGHT PANE (Desktop Auditor) */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-12">{sidebar}</div>
				</div>
			</div>
		</div>
	);
}
