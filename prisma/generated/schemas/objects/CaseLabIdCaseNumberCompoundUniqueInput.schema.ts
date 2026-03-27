import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  labId: z.string(),
  caseNumber: z.string()
}).strict();
export const CaseLabIdCaseNumberCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseLabIdCaseNumberCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseLabIdCaseNumberCompoundUniqueInput>;
export const CaseLabIdCaseNumberCompoundUniqueInputObjectZodSchema = makeSchema();
