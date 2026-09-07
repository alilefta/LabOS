import 'server-only'

import { tenantPrisma } from '@/lib/prisma'
import type { DentistDetailRepository } from '@/modules/labos-dentists/dentist-detail.loader'

export const DENTIST_EDIT_SELECT = {
	id: true,
	name: true,
	email: true,
	phoneNumber: true,
	isOwner: true,
	isDefault: true,
	notes: true,
	avatarUrl: true,
	specialty: true,
	licenseNumber: true,
} as const

export const prismaDentistDetailRepository: DentistDetailRepository = {
	async findDentistDetail({ labId, clinicId, dentistId }) {
		const prisma = await tenantPrisma(labId)
		const dentist = await prisma.dentist.findUnique({
			where: { id: dentistId, clinicId, labId },
			select: DENTIST_EDIT_SELECT,
		})

		return dentist ? Object.freeze({ ...dentist }) : null
	},
}
