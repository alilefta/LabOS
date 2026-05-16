// app/api/dentists/[dentistId]/route.ts
import { getServerSession } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";
import { normalizeDentist } from "@/lib/mappers";

export async function GET(req: Request, { params }: { params: Promise<{ dentistId: string }> }) {
	const session = await getServerSession();
	if (!session?.user?.labId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { dentistId } = await params;
	const clinicId = new URL(req.url).searchParams.get("clinicId");
	if (!clinicId) return Response.json({ error: "Missing clinicId" }, { status: 400 });

	const prisma = await tenantPrisma(session.user.labId);
	const dentist = await prisma.dentist.findUnique({
		where: { id: dentistId, clinicId, labId: session.user.labId },
	});

	if (!dentist) return Response.json({ error: "Not found" }, { status: 404 });

	return Response.json({ dentist: normalizeDentist(dentist) });
}

// Note: Using this route handler solved the problem of using server actions with useQuery as this combination was causing re-rendering issue.
// the case is unique which prevents me from fetching data in a server component then pass it down to client, because it was conditionally depending on an edit dentist id
