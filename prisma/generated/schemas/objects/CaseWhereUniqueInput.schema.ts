import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWhereUniqueInput>;
export const CaseWhereUniqueInputObjectZodSchema = makeSchema();
