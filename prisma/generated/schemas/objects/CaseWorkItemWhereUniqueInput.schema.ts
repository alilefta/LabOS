import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const CaseWorkItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseWorkItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemWhereUniqueInput>;
export const CaseWorkItemWhereUniqueInputObjectZodSchema = makeSchema();
