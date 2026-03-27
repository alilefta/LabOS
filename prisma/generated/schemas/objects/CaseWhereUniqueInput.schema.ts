import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseLabIdCaseNumberCompoundUniqueInputObjectSchema as CaseLabIdCaseNumberCompoundUniqueInputObjectSchema } from './CaseLabIdCaseNumberCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  labId_caseNumber: z.lazy(() => CaseLabIdCaseNumberCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWhereUniqueInput>;
export const CaseWhereUniqueInputObjectZodSchema = makeSchema();
