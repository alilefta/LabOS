'use client'

import { LoaderCircle, Save, ShieldAlert, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { removeOrganizationMemberAction } from '@/actions/settings/team/remove-organization-member'
import { updateOrganizationMemberRoleAction } from '@/actions/settings/team/update-organization-member-role'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import {
	getMembershipAdministrationUiPolicy,
	type MembershipAdministrationViewer,
} from '@/modules/labos-membership/membership-administration.ui-policy'
import type { OrganizationMemberDirectoryItemDTO } from '@/modules/labos-membership/member-directory.dto'

const ROLE_LABELS = Object.freeze({
	owner: 'Owner',
	admin: 'Administrator',
	manager: 'Manager',
	staff: 'Staff',
} as const satisfies Record<LabOSOrganizationRole, string>)

type EditableRole = Exclude<LabOSOrganizationRole, 'owner'>

/**
 * Convenience controls for M-002/M-003. Visibility mirrors the approved role
 * matrix, but is never authoritative: both actions rebuild tenant/actor/target
 * facts and enforce Authorization V1 before Better Auth is invoked.
 */
export function TeamMemberAdministrationControls({
	member,
	viewer,
}: Readonly<{
	member: OrganizationMemberDirectoryItemDTO
	viewer: MembershipAdministrationViewer
}>) {
	const router = useRouter()
	const currentRole = member.roles.length === 1 ? member.roles[0] : null
	const [selectedRole, setSelectedRole] = useState<LabOSOrganizationRole | null>(
		currentRole,
	)
	const [removeOpen, setRemoveOpen] = useState(false)
	const policy = getMembershipAdministrationUiPolicy(viewer, {
		memberId: member.memberId,
		roles: member.roles,
		unknownRoleCount: member.unknownRoleCount,
		hasStaffProfile: member.staff !== null,
	})

	const { executeAsync: updateRole, isExecuting: isUpdating } = useAction(
		updateOrganizationMemberRoleAction,
		{
			onSuccess: () => {
				toast.success('Organization role updated.')
				router.refresh()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)
	const { executeAsync: removeMember, isExecuting: isRemoving } = useAction(
		removeOrganizationMemberAction,
		{
			onSuccess: () => {
				setRemoveOpen(false)
				toast.success('Organization access removed.')
				router.refresh()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const isPending = isUpdating || isRemoving
	const permittedRoles = new Set(policy.roleOptions)
	const visibleRoles = currentRole
		? Array.from(new Set([currentRole, ...policy.roleOptions]))
		: [...policy.roleOptions]
	const canSave =
		policy.canUpdateRole &&
		selectedRole !== null &&
		selectedRole !== 'owner' &&
		selectedRole !== currentRole &&
		permittedRoles.has(selectedRole as EditableRole) &&
		!isPending

	async function saveRole() {
		if (!canSave || !selectedRole) return
		await updateRole({ memberId: member.memberId, roles: [selectedRole] })
	}

	async function confirmRemoval() {
		if (!policy.canRemove || isPending) return
		await removeMember({ memberId: member.memberId })
	}

	if (!policy.canUpdateRole) {
		const messages = [
			policy.isSelf ? 'Current account' : null,
			policy.isOwnerProtected ? 'Ownership is protected' : null,
		].filter((message): message is string => message !== null)

		if (messages.length === 0) {
			messages.push(
				policy.blockReason === 'role_state'
					? 'Role state needs review'
					: 'No administration permission',
			)
		}

		return (
			<div className="flex flex-col gap-1 text-xs text-muted-foreground">
				{messages.map((message) => (
					<p key={message}>{message}</p>
				))}
			</div>
		)
	}

	return (
		<div className="flex min-w-56 flex-col gap-2">
		<div className="flex items-center gap-2">
			<Select
				value={selectedRole ?? undefined}
				disabled={isPending}
				onValueChange={(value) =>
					setSelectedRole(value as LabOSOrganizationRole)
				}
			>
				<SelectTrigger size="sm" className="min-w-36">
					<SelectValue placeholder="Select role" />
				</SelectTrigger>
				<SelectContent>
					{visibleRoles.map((role) => (
						<SelectItem
							key={role}
							value={role}
							disabled={!permittedRoles.has(role as EditableRole)}
						>
							{ROLE_LABELS[role]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				type="button"
				size="sm"
				variant="outline"
				disabled={!canSave}
				onClick={() => void saveRole()}
			>
				{isUpdating ? (
					<LoaderCircle className="size-4 animate-spin" />
				) : (
					<Save className="size-4" />
				)}
				<span className="sr-only">Save role</span>
			</Button>
		</div>

		{member.staff ? (
			<div className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
				<ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
				<span>Use Staff access revocation instead.</span>
			</div>
		) : policy.canRemove ? (
			<>
				<Button
					type="button"
					size="sm"
					variant="ghost"
					disabled={isPending}
					className="w-fit text-destructive hover:bg-destructive/10 hover:text-destructive"
					onClick={() => setRemoveOpen(true)}
				>
					{isRemoving ? (
						<LoaderCircle className="size-4 animate-spin" />
					) : (
						<Trash2 className="size-4" />
					)}
					Remove access
				</Button>

				<AlertDialog open={removeOpen} onOpenChange={setRemoveOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Remove Organization access?</AlertDialogTitle>
							<AlertDialogDescription>
								{member.account.name} will lose access to this LabOS
								workspace. Their account and memberships in other Organizations
								will remain unchanged.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
							<AlertDialogAction
								variant="destructive"
								disabled={isRemoving}
								onClick={(event) => {
									event.preventDefault()
									void confirmRemoval()
								}}
							>
								{isRemoving ? (
									<LoaderCircle className="size-4 animate-spin" />
								) : null}
								Remove access
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		) : null}
		</div>
	)
}
