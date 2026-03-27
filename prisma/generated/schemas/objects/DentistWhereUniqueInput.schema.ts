import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const DentistWhereUniqueInputObjectSchema: z.ZodType<Prisma.DentistWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.DentistWhereUniqueInput>;
export const DentistWhereUniqueInputObjectZodSchema = makeSchema();
