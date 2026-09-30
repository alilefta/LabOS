import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  labId: z.string()
}).strict();
export const CaseIdLabIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseIdLabIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseIdLabIdCompoundUniqueInput>;
export const CaseIdLabIdCompoundUniqueInputObjectZodSchema = makeSchema();
