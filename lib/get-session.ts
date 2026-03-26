import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";
import { tenantPrisma } from "./prisma";

export const getServerSession = cache(async () => {
	return await auth.api.getSession({ headers: await headers() });
});

export const getLabIdSession = cache(async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return null;

	if (!session.user.labId) return null;

	return session.user.labId;
});

export type LabIsolationFnReturnType = Promise<"OK" | "NO_USER" | "NO_LAB_EXIST" | "NO_SESSION" | "LAB_ID_CONFLICT">;

export const CheckLabIsolation = async (labId?: string): LabIsolationFnReturnType => {
	const session = await getServerSession();

	if (!session) {
		return "NO_SESSION";
	}
	const user = session.user;
	if (!user) {
		return "NO_USER";
	}

	if (labId) {
		if (user.labId !== labId) {
			return "LAB_ID_CONFLICT";
		}

		const authLab = await (
			await tenantPrisma(labId)
		).lab.findUnique({
			where: {
				id: labId,
			},
		});

		if (!authLab) {
			return "NO_LAB_EXIST";
		}
	}

	return "OK";
};
