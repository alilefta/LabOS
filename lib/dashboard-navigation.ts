import type { LucideIcon } from 'lucide-react'
import {
	AlertCircle,
	FolderOpen,
	LayoutDashboard,
	Package,
	ReceiptText,
	Stethoscope,
	Users,
} from 'lucide-react'

export type DashboardNavigationItem = {
	title: string
	href: string
	icon: LucideIcon
	badge?: string
	isDanger?: boolean
}

export const dashboardMainNavigation: DashboardNavigationItem[] = [
	{ title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
	{ title: 'Cases', href: '/cases', icon: FolderOpen, badge: '5k+' },
	{ title: 'Clinics', href: '/clinics', icon: Users },
	{ title: 'Catalog', href: '/catalog', icon: Package },
	{ title: 'Invoices', href: '/invoices', icon: ReceiptText },
	{ title: 'Team', href: '/team', icon: Users },
	{ title: 'Technicians', href: '/technicians', icon: Stethoscope },
]

export const dashboardSmartNavigation: DashboardNavigationItem[] = [
	{
		title: 'Urgent Remakes',
		href: '/cases?filter=urgent',
		icon: AlertCircle,
		isDanger: true,
	},
]

export const dashboardSettingsHref = '/settings'
