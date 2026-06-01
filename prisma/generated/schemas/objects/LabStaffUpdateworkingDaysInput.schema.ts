import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WeekdaySchema } from '../enums/Weekday.schema'

const makeSchema = () => z.object({
  set: WeekdaySchema.array().optional(),
  push: z.union([WeekdaySchema, WeekdaySchema.array()]).optional()
}).strict();
export const LabStaffUpdateworkingDaysInputObjectSchema: z.ZodType<Prisma.LabStaffUpdateworkingDaysInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffUpdateworkingDaysInput>;
export const LabStaffUpdateworkingDaysInputObjectZodSchema = makeSchema();
