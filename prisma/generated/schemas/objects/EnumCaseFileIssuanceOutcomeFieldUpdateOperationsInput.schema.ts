import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema'

const makeSchema = () => z.object({
  set: CaseFileIssuanceOutcomeSchema.optional()
}).strict();
export const EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInput>;
export const EnumCaseFileIssuanceOutcomeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
