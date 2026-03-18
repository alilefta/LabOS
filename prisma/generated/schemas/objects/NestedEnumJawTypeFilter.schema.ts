import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { JawTypeSchema } from '../enums/JawType.schema'

const nestedenumjawtypefilterSchema = z.object({
  equals: JawTypeSchema.optional(),
  in: JawTypeSchema.array().optional(),
  notIn: JawTypeSchema.array().optional(),
  not: z.union([JawTypeSchema, z.lazy(() => NestedEnumJawTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumJawTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumJawTypeFilter> = nestedenumjawtypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumJawTypeFilter>;
export const NestedEnumJawTypeFilterObjectZodSchema = nestedenumjawtypefilterSchema;
