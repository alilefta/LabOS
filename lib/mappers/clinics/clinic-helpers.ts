import { ClinicBase } from "@/schema/base/clinic.base";
import { UpdateClinicInput } from "@/schema/composed/clinic.details";

/**
 * Transforms a fully hydrated Clinic object from the Database into
 * the flat shape required by the UpdateClinicInputSchema.
 */
export function mapClinicToUpdateFormValues(clinic: ClinicBase): UpdateClinicInput {
	// ====== Dentists update will goes into their own process.
	// 1. Identify the Primary Dentist
	// An owner takes priority in a SOLO clinic, otherwise fallback to the default/first dentist
	// const primary = clinic.dentists?.find((d) => d.isOwner) || clinic.dentists?.find((d) => d.isDefault) || clinic.dentists?.[0];

	// 2. Identify the Associates (Everyone else)
	// const associates = clinic.dentists?.filter((d) => d.id !== primary?.id) || [];

	return {
		clinicId: clinic.id,
		name: clinic.name,
		description: clinic.description ?? undefined,
		website: clinic.website ?? undefined,
		notes: clinic.notes ?? undefined,

		status: clinic.status,
		type: clinic.type,

		city: clinic.city,
		zipcode: clinic.zipcode ?? undefined,
		address1: clinic.address1,
		address2: clinic.address2 ?? undefined,

		email: clinic.email,
		phoneNumber: clinic.phoneNumber,

		billingEmail: clinic.billingEmail ?? undefined,
		billingPhoneNumber: clinic.billingPhoneNumber ?? undefined,
		taxNumber: clinic.taxNumber ?? undefined,

		discount: clinic.discount ? Number(clinic.discount) : undefined,
		creditLimit: clinic.creditLimit ? Number(clinic.creditLimit) : undefined,

		// // 3. Hydrate Primary Dentist
		// primaryDentist: {
		// 	id: primary?.id, // ID is critical so the server knows to UPDATE, not CREATE
		// 	name: primary?.name || "",
		// 	email: primary?.email ?? undefined,
		// 	phoneNumber: primary?.phoneNumber ?? undefined,
		// 	notes: primary?.notes ?? undefined,
		// 	isOwner: primary?.isOwner ?? false,
		// 	isDefault: primary?.isDefault ?? true,
		// },

		// // 4. Hydrate Associate Dentists
		// additionalDentists: associates.map((associate) => ({
		// 	id: associate.id, // ID tells server to UPDATE
		// 	name: associate.name,
		// 	email: associate.email ?? undefined,
		// 	phoneNumber: associate.phoneNumber ?? undefined,
		// 	notes: associate.notes ?? undefined,
		// 	isOwner: associate.isOwner,
		// 	isDefault: associate.isDefault,
		// })),
	};
}
