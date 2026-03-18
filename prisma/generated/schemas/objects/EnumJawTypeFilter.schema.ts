import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { JawTypeSchema } from '../enums/JawType.schema';
import { NestedEnumJawTypeFilterObjectSchema as NestedEnumJawTypeFilterObjectSchema } from './NestedEnumJawTypeFilter.schema'

const makeSchema = () => z.object({
  equals: JawTypeSchema.optional(),
  in: JawTypeSchema.array().optional(),
  notIn: JawTypeSchema.array().optional(),
  not: z.union([JawTypeSchema, z.lazy(() => NestedEnumJawTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumJawTypeFilterObjectSchema: z.ZodType<Prisma.EnumJawTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumJawTypeFilter>;
export const EnumJawTypeFilterObjectZodSchema = makeSchema();
