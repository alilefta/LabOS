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
	})
	.inputSchema(CreateLabAndLabUserInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { lab, labUser } = parsedInput;

		const { user } = ctx;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
		}

		// Additional Check if user some how have lab ID
		if (user.labId) {
			const authLab = await generalPrisma.lab.findUnique({
				where: {
					id: user.labId,
				},
			});

			if (authLab) {
				throw ERRORS.LAB_ALREADY_EXISTS;
			}
		}

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
				const createdLab = await tx.lab.create({
					data: {
						title: lab.title,
						subtitle: lab.subtitle,
						slug: lab.slug,
						brandAvatarUrl: lab.brandAvatarUrl,
					},
				});

				const createdLabUser = await tx.labUser.create({
					data: {
						name: labUser.name,
						address1: labUser.address1,
						secondaryEmail: labUser.secondaryEmail,
						avatarUrl: labUser.avatarUrl ?? "",
						city: labUser.city,
						phoneNumber: labUser.phoneNumber,
						zipcode: labUser.zipcode,
						authUserId: user.id,
						labId: createdLab.id,
						address2: labUser.address2,
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
				labUser: results.createdLabUser,
				alreadyExists: false,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Sign-Up-Action] Error", e.message);
			}
			throw e;
		}
	});
