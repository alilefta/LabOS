import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WeekdaySchema } from '../enums/Weekday.schema'

const makeSchema = () => z.object({
  set: WeekdaySchema.array()
}).strict();
export const LabStaffCreateworkingDaysInputObjectSchema: z.ZodType<Prisma.LabStaffCreateworkingDaysInput> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCreateworkingDaysInput>;
export const LabStaffCreateworkingDaysInputObjectZodSchema = makeSchema();
