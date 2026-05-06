import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutOriginalCaseInputObjectSchema as CaseCreateWithoutOriginalCaseInputObjectSchema } from './CaseCreateWithoutOriginalCaseInput.schema';
import { CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema as CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedCreateWithoutOriginalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutOriginalCaseInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutOriginalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutOriginalCaseInput>;
export const CaseCreateOrConnectWithoutOriginalCaseInputObjectZodSchema = makeSchema();
