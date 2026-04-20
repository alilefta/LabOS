import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseActivityLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseActivityLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogWhereUniqueInput>;
export const CaseActivityLogWhereUniqueInputObjectZodSchema = makeSchema();
