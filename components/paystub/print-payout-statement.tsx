'use client'

import { Button } from '@/components/ui/button'
import { Printer } from 'lucide-react'

export function PrintPayoutButton() {
	return (
		<Button
			variant="outline"
			onClick={() => window.print()}
			className="rounded-xl h-10 px-4 font-bold border-slate-200 bg-white hover:bg-slate-50 shadow-sm text-xs"
		>
			<Printer className="w-4 h-4 mr-2" /> Print Statement
		</Button>
	)
}
