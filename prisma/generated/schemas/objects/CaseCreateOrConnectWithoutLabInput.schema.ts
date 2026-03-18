import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutLabInputObjectSchema as CaseCreateWithoutLabInputObjectSchema } from './CaseCreateWithoutLabInput.schema';
import { CaseUncheckedCreateWithoutLabInputObjectSchema as CaseUncheckedCreateWithoutLabInputObjectSchema } from './CaseUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutLabInput>;
export const CaseCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
