"use server";

import { auth } from "@/lib/auth";
import { ERRORS } from "@/lib/errors";
import { generalPrisma } from "@/lib/prisma";
import { actionClientWithSession } from "@/lib/safe-action";
import { CreateLabAndLabUserInputSchema } from "@/schema/composed/lab.details";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export const createLabAndLabUser = actionClientWithSession
	.metadata({
		actionName: "Create-Lab-And-Lab-User",
		requiredLabRole: null,
	})
	.inputSchema(CreateLabAndLabUserInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { lab, labUser } = parsedInput;

		const { user } = ctx;

		if (user.labId) {
			const existing = await generalPrisma.lab.findUnique({ where: { id: user.labId } });
			if (existing) throw ERRORS.LAB_ALREADY_EXISTS;
		}

		// Split the Better-Auth name into First/Last for LabStaff
		const nameParts = user.name.split(" ");
		const firstName = nameParts[0] || "Owner";
		const lastName = nameParts.slice(1).join(" ") || "Member";

		// maybe there is a lab user but the lab ID is not set to that user
		const labUserEntity = await generalPrisma.labUser.findFirst({
			where: {
				authUserId: user.id,
			},
			include: {
				lab: true,
			},
		});

		// if exists then we just set
		if (labUserEntity?.labId) {
			await auth.api.updateUser({
				body: {
					labId: labUserEntity.labId,
				},
				headers: await headers(),
			});

			return {
				alreadyExists: true,
				lab: labUserEntity.lab,
				labUser: labUserEntity,
			};
		}

		try {
			const results = await generalPrisma.$transaction(async (tx) => {
				// A. Create the Lab
				const createdLab = await tx.lab.create({
					data: {
						title: lab.title,
						subtitle: lab.subtitle,
						slug: lab.slug,
						brandAvatarUrl: lab.brandAvatarUrl,
					},
					select: {
						title: true,
						id: true,
					},
				});

				// B. Create the Human Resource (LabStaff)
				// This holds the physical address and phone from the form
				const ownerStaffRecord = await tx.labStaff.create({
					data: {
						labId: createdLab.id,
						firstName,
						lastName,
						phoneNumber: labUser.phoneNumber,
						avatarUrl: user.image ?? lab.brandAvatarUrl, // Use the profile photo from Google/Github
						city: labUser.city,
						address1: labUser.address1,
						address2: labUser.address2,
						zipcode: labUser.zipcode,
						roleCategory: "MANAGER", // Owners act as Managers operationally
						commissionType: "PERCENTAGE",
						commissionValue: 0,
					},
					select: {
						id: true,
					},
				});

				// C. Create the System Seat (LabUser)
				// Linked to BOTH the human record and the auth account
				const createdLabUser = await tx.labUser.create({
					data: {
						labId: createdLab.id,
						authUserId: user.id,
						labStaffId: ownerStaffRecord.id, // THE LINK
						role: "OWNER", // Permissions role
					},
					select: {
						id: true,
					},
				});

				return { createdLab, createdLabUser };
			});

			await auth.api.updateUser({
				body: {
					labId: results.createdLab.id,
				},
				headers: await headers(),
			});

			return {
				lab: results.createdLab,
				alreadyExists: false,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Sign-Up-Action] Error", e.message);
			}
			throw e;
		}
	});
