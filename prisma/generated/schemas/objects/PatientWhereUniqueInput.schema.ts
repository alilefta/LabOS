import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const PatientWhereUniqueInputObjectSchema: z.ZodType<Prisma.PatientWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PatientWhereUniqueInput>;
export const PatientWhereUniqueInputObjectZodSchema = makeSchema();
