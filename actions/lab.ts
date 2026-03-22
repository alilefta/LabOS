"use server";

import { auth } from "@/lib/auth";
import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { generalPrisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { CreateLabAndLabUserInputSchema } from "@/schema/composed/lab.details";
import { APIError } from "better-auth";
import { headers } from "next/headers";

export const createLabAndLabUser = actionClient
	.metadata({
		actionName: "Create-Lab-And-Lab-User",
	})
	.inputSchema(CreateLabAndLabUserInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { lab, labUser } = parsedInput;

		const session = await getServerSession();
		const user = session?.user ?? null;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
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

			// should we create the cookies for next.cookies or not, still not sure.

			return {
				lab: results.createdLab,
				labUser: results.createdLabUser,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Sign-Up-Action] Error", e.message);
			}
			throw e;
		}
	});
