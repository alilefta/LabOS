"use server";

import { Session } from "@/lib/auth";
import { getServerSession } from "@/lib/get-session";
import { actionClient } from "@/lib/safe-action";
import { CreateLabAndLabUserInputSchema } from "@/schema/composed/lab.details";

export const createLabAndLabUser = actionClient
	.metadata({
		actionName: "Create-Lab-And-Lab-User",
	})
	.inputSchema(CreateLabAndLabUserInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		// need to fix the session and user types incompatibility
		const session: Session | null = await getServerSession();
		if (!session) {
			console.error("No Session");
			// do something
		}
		const user = session?.user;
		const labId = session?.session.labId;
	});
