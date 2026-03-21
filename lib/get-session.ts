import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

export const getServerSession = cache(async () => {
	return await auth.api.getSession({ headers: await headers() });
});

export const getLabIdSession = cache(async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return null;

	if (!session.session.labId) return null;

	return session.session.labId;
});
