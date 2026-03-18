import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const WorkTypeWhereUniqueInputObjectSchema: z.ZodType<Prisma.WorkTypeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeWhereUniqueInput>;
export const WorkTypeWhereUniqueInputObjectZodSchema = makeSchema();
