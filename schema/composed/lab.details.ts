import z from "zod";
import { CreateLabInputSchema } from "@/schema/base/lab.base";
import { CreateLabUserInputSchema } from "./lab-user.details";

export const CreateLabAndLabUserInputSchema = z.object({
	lab: CreateLabInputSchema,
	labUser: CreateLabUserInputSchema,
});

export type CreateLabAndLabUserInput = z.infer<typeof CreateLabAndLabUserInputSchema>;
