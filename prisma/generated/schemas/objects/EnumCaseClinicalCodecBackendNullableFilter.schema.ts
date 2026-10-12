import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema';
import { NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema as NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema } from './NestedEnumCaseClinicalCodecBackendNullableFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalCodecBackendSchema.optional().nullable(),
  in: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  notIn: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  not: z.union([CaseClinicalCodecBackendSchema, z.lazy(() => NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumCaseClinicalCodecBackendNullableFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalCodecBackendNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalCodecBackendNullableFilter>;
export const EnumCaseClinicalCodecBackendNullableFilterObjectZodSchema = makeSchema();
