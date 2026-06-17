'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Plus, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Replace with your actual server action
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { WorkTypeBentoGridCard } from './worktype-bento-grid-card'
import { getWorkTypesByCategoryAction } from '@/actions/catalog/get-worktypes-by-category'
import { memo, useCallback, useState } from 'react'
import { CatalogRenameModal } from '@/components/modals/catalog/catalog-rename-modal'
import { ArchiveWorkTypeModal } from '@/components/modals/catalog/work-types/archive-worktype-modal'
import { DeleteWorkTypeModal } from '@/components/modals/catalog/work-types/delete-work-type-modal'
import dynamic from 'next/dynamic'
import { MoveWorkTypeModal } from '@/components/modals/catalog/work-types/move-work-type-modal'

interface Props {
	categoryId: string
	labId: string
}
const WorkTypeEditorSheet = dynamic(
	() =>
		import('../../modals/catalog/work-types/work-type-editor-sheet').then(
			(m) => m.WorkTypeEditorSheet,
		),
	{
		ssr: false,
	},
)
export const WorkTypeBentoGrid = memo(function WorkTypeBentoGrid({
	categoryId,
	labId,
}: Props) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryClient = useQueryClient()

	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
	const [isMoveWorkTypeModalOpen, setIsMoveWorkTypeModalOpen] = useState(false)
	const [isEditorSheetOpen, setIsEditorSheetOpen] = useState(false)
	const [isArchiveWorkTypeModalOpen, setIsArchiveWorkTypeModalOpen] =
		useState(false)

	const [isDeleteWorkTypeModalOpen, setIsDeleteWorkTypeModalOpen] =
		useState(false)

	const [workTypeToPermanentDelete, setWorkTypeToPermanentDelete] = useState<{
		id: string
		name: string
	} | null>(null)
	const [workTypeToRename, setWorkTypeToRename] = useState<{
		id: string
		name: string
	} | null>(null)

	const [workTypeToArchive, setWorkTypeToArchive] = useState<{
		id: string
		name: string
		isCurrentlyArchived: boolean
	} | null>(null)

	const [workTypeToMove, setWorkTypeToMove] = useState<{
		id: string
		name: string
		categoryId: string
	} | null>(null)

	const [worktypeIdToEdit, setWorkTypeIdToEdit] = useState<string | null>(null)

	// --- 1. DATA FETCHING ---
	const { data: workTypes = [], isLoading } = useQuery({
		queryKey: ['catalog-work-types', labId, categoryId],
		queryFn: async () => {
			const res = await getWorkTypesByCategoryAction({
				caseCategoryId: categoryId,
				limit: 50,
				showArchived: true,
			})
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return []
			}
			return res?.data?.workTypes || [] // Assume your DTO returns _count.products as well
		},
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
	})

	// --- 2. URL BUILDER (The Context Shift) ---
	const navigateToProducts = (workTypeId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		// Notice we KEEP the categoryId in the URL, but ADD the wtId.
		// The parent `CatalogPage` will read `wtId` and slide the context window!
		params.set('wt', workTypeId)
		params.delete('product') // Clean up deep states
		router.replace(`${pathname}?${params.toString()}`)
	}

	const handleRename = useCallback((id: string, name: string) => {
		setWorkTypeToRename({
			id,
			name,
		})
		setIsRenameModalOpen(true)
	}, [])

	const handleCloseRenameModal = useCallback(() => {
		setIsRenameModalOpen(false)
		setWorkTypeToRename(null)
	}, [])

	const handleCloseEditorSheet = useCallback(() => {
		setIsEditorSheetOpen(false)
		setTimeout(() => {
			setWorkTypeIdToEdit(null)
		}, 300)
	}, [])

	const handleCreateNewWorkType = useCallback(() => {
		setWorkTypeIdToEdit(null)
		setIsEditorSheetOpen(true)
	}, [])

	const handleEditWorkType = useCallback((id: string) => {
		setWorkTypeIdToEdit(id)
		setIsEditorSheetOpen(true)
	}, [])

	const handleArchiveWorkType = useCallback(
		(id: string, name: string, isCurrentlyArchived: boolean) => {
			setWorkTypeToArchive({
				id,
				name,
				isCurrentlyArchived,
			})
			setIsArchiveWorkTypeModalOpen(true)
		},
		[],
	)

	const handlePermanentDelete = useCallback((id: string, name: string) => {
		setWorkTypeToPermanentDelete({
			id,
			name,
		})
		setIsDeleteWorkTypeModalOpen(true)
	}, [])

	const handleMoveWorkType = useCallback(
		(id: string, name: string) => {
			setWorkTypeToMove({
				id,
				name,
				categoryId,
			})
			setIsMoveWorkTypeModalOpen(true)
		},
		[categoryId],
	)

	const handleCloseArchiveWorkTypeModal = useCallback(() => {
		setIsArchiveWorkTypeModalOpen(false)
		setTimeout(() => {
			setWorkTypeToArchive(null)
		}, 300)
	}, [])

	const handleCloseMoveWorkTypeModal = useCallback(() => {
		setIsMoveWorkTypeModalOpen(false)
		setTimeout(() => {
			setWorkTypeToMove(null)
		}, 300)
	}, [])

	const handleClosePermanentDeleteWorkTypeModal = useCallback(() => {
		setIsDeleteWorkTypeModalOpen(false)
		setTimeout(() => {
			setWorkTypeToPermanentDelete(null)
		}, 300)
	}, [])

	// --- 3. LOADING STATE ---
	if (isLoading) {
		return (
			<div className="flex flex-col h-full p-6 lg:p-10 animate-in fade-in duration-500">
				<Skeleton className="h-12 w-64 rounded-xl mb-8 bg-slate-100 dark:bg-white/5" />
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton
							key={i}
							className="h-48 rounded-3xl bg-slate-100 dark:bg-white/5"
						/>
					))}
				</div>
			</div>
		)
	}

	const categoryName =
		workTypes && workTypes.length > 0 ? workTypes[0].categoryName : 'N/A'

	return (
		<div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-6 lg:p-10 animate-in fade-in duration-500 relative">
			{/* Ambient Category Glow */}
			<div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 shrink-0">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<div className="w-1.5 h-6 bg-primary rounded-full" />
						<h2 className="text-2xl font-bold tracking-tight text-foreground">
							Department Structures
						</h2>
					</div>
					<p className="text-sm text-muted-foreground ml-4">
						Manage the organizational workflow groupings for this category.
					</p>
				</div>

				<Button
					className="h-10 rounded-xl bg-primary text-white shadow-premium font-bold hover:bg-primary/90 transition-all shrink-0"
					onClick={handleCreateNewWorkType}
				>
					<Plus className="w-4 h-4 mr-2" /> New Work Type
				</Button>
			</div>

			{/* --- EMPTY STATE --- */}
			{workTypes.length === 0 ? (
				<div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500">
					<div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-6 shadow-sm">
						<FolderOpen className="w-8 h-8" />
					</div>
					<h3 className="text-xl font-bold text-foreground mb-2">
						No Work Types Configured
					</h3>
					<p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-8">
						This category is empty. Create a Work Type (e.g. &quot;Crowns &
						Bridges&quot;) to begin adding manufacturing products to your
						catalog.
					</p>
					<Button
						variant="outline"
						className="rounded-xl h-11 px-6 font-bold border-border shadow-sm"
						onClick={handleCreateNewWorkType}
					>
						<Plus className="w-4 h-4 mr-2 text-primary" /> Create First Work
						Type
					</Button>
				</div>
			) : (
				/* --- BENTO GRID --- */
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{workTypes.map((wt) => (
						<WorkTypeBentoGridCard
							key={wt.id}
							workType={wt} // Passes the exact object from the new server action
							onManageProducts={navigateToProducts} // Use the routing function you built!
							// These will be wired to your Zustand store or local state later
							onEdit={handleEditWorkType}
							onMoveCategory={handleMoveWorkType}
							onArchive={handleArchiveWorkType}
							onHardDelete={handlePermanentDelete}
							onRename={handleRename}
						/>
					))}
				</div>
			)}

			<WorkTypeEditorSheet
				isOpen={isEditorSheetOpen}
				onClose={handleCloseEditorSheet}
				// productIdToEdit={productEditId}
				isEdit={!!worktypeIdToEdit}
				key={worktypeIdToEdit}
				onSuccess={() => {
					queryClient.invalidateQueries({
						queryKey: ['catalog-work-types', labId, categoryId],
					})
				}}
				categoryId={categoryId}
				categoryName={categoryName}
				workTypeIdToEdit={worktypeIdToEdit}
			/>

			{workTypeToRename && (
				<CatalogRenameModal
					isOpen={isRenameModalOpen}
					onClose={handleCloseRenameModal}
					entityId={workTypeToRename.id}
					entityType="WORKTYPE"
					initialName={workTypeToRename.name}
					key={workTypeToRename.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-work-types', labId, categoryId],
						})
					}}
				/>
			)}

			{workTypeToArchive && (
				<ArchiveWorkTypeModal
					isOpen={isArchiveWorkTypeModalOpen}
					onClose={handleCloseArchiveWorkTypeModal}
					workTypeId={workTypeToArchive.id}
					workTypeName={workTypeToArchive.name}
					key={workTypeToArchive.id}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-work-types', labId, categoryId],
						})
					}}
					isCurrentlyArchived={workTypeToArchive.isCurrentlyArchived}
				/>
			)}

			{workTypeToPermanentDelete && (
				<DeleteWorkTypeModal
					isOpen={isDeleteWorkTypeModalOpen}
					onClose={handleClosePermanentDeleteWorkTypeModal}
					workTypeId={workTypeToPermanentDelete.id}
					workTypeName={workTypeToPermanentDelete.name}
					key={workTypeToPermanentDelete.id}
					onSuccess={() => {
						// router.push(pathName + `?wt=` + workTypeId)
					}}
				/>
			)}

			{workTypeToMove && (
				<MoveWorkTypeModal
					isOpen={isMoveWorkTypeModalOpen}
					onClose={handleCloseMoveWorkTypeModal}
					workTypeId={workTypeToMove.id}
					workTypeName={workTypeToMove.name}
					currentCategoryId={categoryId}
					currentCategoryName={categoryName}
					onSuccess={() => {
						queryClient.invalidateQueries({
							queryKey: ['catalog-work-types', labId, categoryId],
						})
					}}
				/>
			)}
		</div>
	)
})
