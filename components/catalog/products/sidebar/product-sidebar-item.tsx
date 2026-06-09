'use client'

import { cn } from '@/lib/utils'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreVertical, Edit3, Archive, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductItemProps {
	prod: CatalogProductDTO
	isActive: boolean
	createProductLink: (id: string) => string
	handleRename: (id: string, name: string) => void
	handleEdit: (id: string) => void
}
export const ProductItem = memo(function productItem({
	prod,
	isActive,
	handleRename,
	createProductLink,
	handleEdit,
}: ProductItemProps) {
	return (
		<div
			key={prod.id}
			className={cn(
				'group relative flex items-center justify-between p-1 pr-2 rounded-xl transition-all duration-200',
				isActive
					? 'bg-ai/10 dark:bg-ai/15'
					: 'hover:bg-slate-100 dark:hover:bg-white/5',
			)}
		>
			{/* The clickable area (Link) */}
			<Link
				href={createProductLink(prod.id)}
				replace
				className="flex-1 flex items-center gap-3 p-2 outline-none min-w-0"
			>
				{/* Active Indicator Bar */}
				<div
					className={cn(
						'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300',
						isActive ? 'bg-ai scale-y-100' : 'bg-transparent scale-y-0',
					)}
				/>

				{/* Icon / Avatar */}
				<div
					className={cn(
						'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-sm',
						isActive
							? 'bg-white dark:bg-[#121214] text-ai border border-ai/20'
							: 'bg-white dark:bg-[#121214] text-muted-foreground border border-border group-hover:text-foreground',
					)}
				>
					{/* NEW: Replaced img with Next.js Image component */}
					{prod.imageUrl ? (
						<Image
							src={prod.imageUrl}
							alt={prod.name}
							fill
							className="object-cover p-1 rounded-lg"
							sizes="32px"
						/>
					) : (
						<span className="text-xs font-bold font-mono">
							{prod.name.substring(0, 2).toUpperCase()}
						</span>
					)}
				</div>

				{/* Text Details */}
				<div className="flex flex-col min-w-0 flex-1">
					<span
						className={cn(
							'text-xs font-bold truncate transition-colors',
							isActive ? 'text-ai' : 'text-foreground group-hover:text-ai',
						)}
					>
						{prod.name}
					</span>
					{/* Show material/desc snippet if exists */}
					<span className="text-[9px] text-muted-foreground truncate max-w-full">
						{prod.description || 'No description'}
					</span>
				</div>
			</Link>

			{/* Context Menu (3-dots) */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							'h-7 w-7 rounded-lg transition-opacity shrink-0',
							isActive
								? 'opacity-100 text-ai hover:bg-ai/20'
								: 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:bg-slate-200 dark:hover:bg-white/10',
						)}
					>
						<MoreVertical className="w-3.5 h-3.5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					side="right"
					className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]"
				>
					<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						Options
					</DropdownMenuLabel>
					<DropdownMenuItem
						className="cursor-pointer font-medium text-xs py-2 hover:bg-primary/5"
						onClick={() => handleRename(prod.id, prod.name)}
					>
						<Type className="w-3.5 h-3.5 mr-2" /> Rename Product
					</DropdownMenuItem>
					<DropdownMenuItem
						className="cursor-pointer font-medium text-xs py-2 hover:bg-ai/5"
						onClick={() => handleEdit(prod.id)}
					>
						<Edit3 className="w-3.5 h-3.5 mr-2" />
						Edit
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-border/50" />

					<DropdownMenuItem className="cursor-pointer font-medium text-xs py-2 text-rose-600 focus:text-rose-500 focus:bg-rose-500/10">
						<Archive className="w-3.5 h-3.5 mr-2" /> Archive Product
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
})
