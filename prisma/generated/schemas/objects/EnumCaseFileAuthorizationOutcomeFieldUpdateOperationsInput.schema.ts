import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema'

const makeSchema = () => z.object({
  set: CaseFileAuthorizationOutcomeSchema.optional()
}).strict();
export const EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInput>;
export const EnumCaseFileAuthorizationOutcomeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
