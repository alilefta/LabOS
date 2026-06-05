import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string().optional()
}).strict();
export const LabSettingsWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabSettingsWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsWhereUniqueInput>;
export const LabSettingsWhereUniqueInputObjectZodSchema = makeSchema();
