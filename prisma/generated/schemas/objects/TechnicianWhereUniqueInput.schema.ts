import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const TechnicianWhereUniqueInputObjectSchema: z.ZodType<Prisma.TechnicianWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.TechnicianWhereUniqueInput>;
export const TechnicianWhereUniqueInputObjectZodSchema = makeSchema();
