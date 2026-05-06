import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FaultPartySchema } from '../enums/FaultParty.schema'

const makeSchema = () => z.object({
  set: FaultPartySchema.optional()
}).strict();
export const NullableEnumFaultPartyFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumFaultPartyFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumFaultPartyFieldUpdateOperationsInput>;
export const NullableEnumFaultPartyFieldUpdateOperationsInputObjectZodSchema = makeSchema();
