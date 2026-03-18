import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ClinicWhereUniqueInputObjectSchema: z.ZodType<Prisma.ClinicWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicWhereUniqueInput>;
export const ClinicWhereUniqueInputObjectZodSchema = makeSchema();
