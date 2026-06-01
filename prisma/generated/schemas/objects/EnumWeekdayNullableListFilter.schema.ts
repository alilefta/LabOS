import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WeekdaySchema } from '../enums/Weekday.schema'

const makeSchema = () => z.object({
  equals: WeekdaySchema.array().optional().nullable(),
  has: WeekdaySchema.optional().nullable(),
  hasEvery: WeekdaySchema.array().optional(),
  hasSome: WeekdaySchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const EnumWeekdayNullableListFilterObjectSchema: z.ZodType<Prisma.EnumWeekdayNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumWeekdayNullableListFilter>;
export const EnumWeekdayNullableListFilterObjectZodSchema = makeSchema();
