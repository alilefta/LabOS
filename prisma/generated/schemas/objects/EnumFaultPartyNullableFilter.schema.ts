import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { NestedEnumFaultPartyNullableFilterObjectSchema as NestedEnumFaultPartyNullableFilterObjectSchema } from './NestedEnumFaultPartyNullableFilter.schema'

const makeSchema = () => z.object({
  equals: FaultPartySchema.optional().nullable(),
  in: FaultPartySchema.array().optional().nullable(),
  notIn: FaultPartySchema.array().optional().nullable(),
  not: z.union([FaultPartySchema, z.lazy(() => NestedEnumFaultPartyNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumFaultPartyNullableFilterObjectSchema: z.ZodType<Prisma.EnumFaultPartyNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumFaultPartyNullableFilter>;
export const EnumFaultPartyNullableFilterObjectZodSchema = makeSchema();
