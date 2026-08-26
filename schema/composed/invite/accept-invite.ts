import z from 'zod'

export const AcceptOrganizationInvitationInputSchema = z.object({
	invitationId: z.string().trim().min(1).max(128),
})
