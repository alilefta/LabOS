import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const LabWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabWhereUniqueInput>;
export const LabWhereUniqueInputObjectZodSchema = makeSchema();
