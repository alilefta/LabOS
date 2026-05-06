import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutRemakesInputObjectSchema as CaseCreateWithoutRemakesInputObjectSchema } from './CaseCreateWithoutRemakesInput.schema';
import { CaseUncheckedCreateWithoutRemakesInputObjectSchema as CaseUncheckedCreateWithoutRemakesInputObjectSchema } from './CaseUncheckedCreateWithoutRemakesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutRemakesInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutRemakesInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutRemakesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutRemakesInput>;
export const CaseCreateOrConnectWithoutRemakesInputObjectZodSchema = makeSchema();
