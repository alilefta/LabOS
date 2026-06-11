'use client'

import { memo, useState } from 'react'
import { AlertTriangle, Loader2, LucideIcon } from 'lucide-react'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DestructiveActionModalProps {
	isOpen: boolean
	onClose: () => void

	// Content
	title: string
	description: string
	warningText?: string
	actionLabel?: string

	// NEW: Security barrier for Hard Deletes
	requireConfirmationText?: string

	// State & Handlers
	isExecuting: boolean
	onConfirm: () => void

	// Customization
	icon?: LucideIcon
}

export const DestructiveActionModal = memo(function DestructiveActionModal({
	isOpen,
	onClose,
	title,
	description,
	warningText,
	actionLabel = 'Confirm Action',
	requireConfirmationText,
	isExecuting,
	onConfirm,
	icon: Icon = AlertTriangle,
}: DestructiveActionModalProps) {
	// Track the user's typed confirmation
	const [confirmationInput, setConfirmationInput] = useState('')
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen)

	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen)
		if (isOpen) {
			setConfirmationInput('')
		}
	}
	// Reset input when modal closes

	// The button is disabled if it's executing, OR if they haven't typed the exact confirmation phrase (case-sensitive)
	const isButtonDisabled =
		isExecuting ||
		(!!requireConfirmationText && confirmationInput !== requireConfirmationText)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !isExecuting && !open && onClose()}
		>
			<DialogContent
				className="sm:max-w-md p-0 overflow-hidden border-destructive/20 bg-card shadow-2xl rounded-3xl"
				showCloseButton={false}
			>
				{/* --- HEADER --- */}
				<DialogHeader className="p-8 pb-4 flex flex-col items-center text-center bg-linear-to-b from-destructive/10 via-destructive/5 to-transparent relative border-b border-border/50">
					<div className="absolute top-0 right-0 w-48 h-48 bg-destructive/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>

					<div className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm mb-4 relative z-10 text-destructive bg-destructive/10 border-destructive/20 shadow-destructive/20">
						<Icon className="w-7 h-7" />
					</div>

					<div className="relative z-10">
						<DialogTitle className="text-xl font-bold tracking-tight text-foreground">
							{title}
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground font-medium mt-1.5 px-4 leading-relaxed">
							{description}
						</DialogDescription>
					</div>
				</DialogHeader>

				{/* --- BODY --- */}
				<div className="p-6 flex flex-col gap-6">
					{/* Impact Warning */}
					{warningText && (
						<div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 flex gap-3 items-start shadow-sm">
							<AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5 animate-pulse" />
							<p className="text-[11px] text-destructive/90 leading-relaxed font-medium">
								<span className="font-bold text-destructive uppercase tracking-widest block mb-1">
									Impact Warning
								</span>
								{warningText}
							</p>
						</div>
					)}

					{/* NEW: Type-To-Confirm Barrier */}
					{requireConfirmationText && (
						<div className="flex flex-col gap-2 pt-2">
							<label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
								Type{' '}
								<span className="text-foreground font-mono bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded select-all">
									{requireConfirmationText}
								</span>{' '}
								to confirm
							</label>
							<input
								type="text"
								value={confirmationInput}
								onChange={(e) => setConfirmationInput(e.target.value)}
								placeholder={requireConfirmationText}
								className="w-full h-11 px-4 bg-white dark:bg-[#121214] border border-destructive/30 rounded-xl text-sm font-mono focus:outline-none focus:ring-[3px] focus:ring-destructive/20 focus:border-destructive transition-all shadow-sm"
								autoComplete="off"
								spellCheck="false"
							/>
						</div>
					)}
				</div>

				{/* --- FOOTER --- */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1">
					<div className="flex w-full items-center gap-3">
						<DialogClose asChild>
							<Button
								variant="ghost"
								disabled={isExecuting}
								className="rounded-xl h-11 px-6 font-semibold flex-1 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							onClick={onConfirm}
							disabled={isButtonDisabled}
							className="flex-1 rounded-xl h-11 font-bold transition-all flex items-center justify-center gap-2 bg-destructive text-destructive-foreground shadow-premium hover:bg-destructive/90 disabled:opacity-50 disabled:bg-destructive/50"
						>
							{isExecuting ? (
								<Loader2 className="animate-spin w-4 h-4" />
							) : (
								actionLabel
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
})

DestructiveActionModal.displayName = 'DestructiveActionModal'
