import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalCodecBackendSchema } from '../enums/CaseClinicalCodecBackend.schema'

const nestedenumcaseclinicalcodecbackendnullablefilterSchema = z.object({
  equals: CaseClinicalCodecBackendSchema.optional().nullable(),
  in: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  notIn: CaseClinicalCodecBackendSchema.array().optional().nullable(),
  not: z.union([CaseClinicalCodecBackendSchema, z.lazy(() => NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumCaseClinicalCodecBackendNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalCodecBackendNullableFilter> = nestedenumcaseclinicalcodecbackendnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalCodecBackendNullableFilter>;
export const NestedEnumCaseClinicalCodecBackendNullableFilterObjectZodSchema = nestedenumcaseclinicalcodecbackendnullablefilterSchema;
