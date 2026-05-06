import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { FaultPartySchema } from '../enums/FaultParty.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumFaultPartyNullableFilterObjectSchema as NestedEnumFaultPartyNullableFilterObjectSchema } from './NestedEnumFaultPartyNullableFilter.schema'

const nestedenumfaultpartynullablewithaggregatesfilterSchema = z.object({
  equals: FaultPartySchema.optional().nullable(),
  in: FaultPartySchema.array().optional().nullable(),
  notIn: FaultPartySchema.array().optional().nullable(),
  not: z.union([FaultPartySchema, z.lazy(() => NestedEnumFaultPartyNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumFaultPartyNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumFaultPartyNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumFaultPartyNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumFaultPartyNullableWithAggregatesFilter> = nestedenumfaultpartynullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumFaultPartyNullableWithAggregatesFilter>;
export const NestedEnumFaultPartyNullableWithAggregatesFilterObjectZodSchema = nestedenumfaultpartynullablewithaggregatesfilterSchema;
