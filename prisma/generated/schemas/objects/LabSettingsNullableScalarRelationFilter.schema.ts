import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsWhereInputObjectSchema as LabSettingsWhereInputObjectSchema } from './LabSettingsWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => LabSettingsWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => LabSettingsWhereInputObjectSchema).optional().nullable()
}).strict();
export const LabSettingsNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.LabSettingsNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsNullableScalarRelationFilter>;
export const LabSettingsNullableScalarRelationFilterObjectZodSchema = makeSchema();
