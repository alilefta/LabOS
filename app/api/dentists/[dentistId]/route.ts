// app/api/dentists/[dentistId]/route.ts
import { tenantPrisma } from "@/lib/prisma";
import { normalizeDentist } from "@/lib/mappers";
import {
	requireTenantContext,
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from "@/platform/organizations/tenant-context";

export async function GET(req: Request, { params }: { params: Promise<{ dentistId: string }> }) {
	let labId: string;
	try {
		labId = (await requireTenantContext()).labId;
	} catch (error) {
		if (error instanceof TenantContextError) {
			const status = error.code === TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED ? 401 : 403;
			return Response.json({ error: status === 401 ? "Unauthorized" : "Forbidden" }, { status });
		}
		throw error;
	}

	const { dentistId } = await params;
	const clinicId = new URL(req.url).searchParams.get("clinicId");
	if (!clinicId) return Response.json({ error: "Missing clinicId" }, { status: 400 });

	const prisma = await tenantPrisma(labId);
	const dentist = await prisma.dentist.findUnique({
		where: { id: dentistId, clinicId, labId },
	});

	if (!dentist) return Response.json({ error: "Not found" }, { status: 404 });

	return Response.json({ dentist: normalizeDentist(dentist) });
}

// Note: Using this route handler solved the problem of using server actions with useQuery as this combination was causing re-rendering issue.
// the case is unique which prevents me from fetching data in a server component then pass it down to client, because it was conditionally depending on an edit dentist id
