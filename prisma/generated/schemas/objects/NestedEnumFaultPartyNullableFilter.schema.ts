import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FaultPartySchema } from '../enums/FaultParty.schema'

const nestedenumfaultpartynullablefilterSchema = z.object({
  equals: FaultPartySchema.optional().nullable(),
  in: FaultPartySchema.array().optional().nullable(),
  notIn: FaultPartySchema.array().optional().nullable(),
  not: z.union([FaultPartySchema, z.lazy(() => NestedEnumFaultPartyNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumFaultPartyNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumFaultPartyNullableFilter> = nestedenumfaultpartynullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumFaultPartyNullableFilter>;
export const NestedEnumFaultPartyNullableFilterObjectZodSchema = nestedenumfaultpartynullablefilterSchema;
