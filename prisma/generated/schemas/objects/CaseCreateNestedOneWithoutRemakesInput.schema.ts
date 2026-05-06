import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutRemakesInputObjectSchema as CaseCreateWithoutRemakesInputObjectSchema } from './CaseCreateWithoutRemakesInput.schema';
import { CaseUncheckedCreateWithoutRemakesInputObjectSchema as CaseUncheckedCreateWithoutRemakesInputObjectSchema } from './CaseUncheckedCreateWithoutRemakesInput.schema';
import { CaseCreateOrConnectWithoutRemakesInputObjectSchema as CaseCreateOrConnectWithoutRemakesInputObjectSchema } from './CaseCreateOrConnectWithoutRemakesInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutRemakesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutRemakesInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseCreateNestedOneWithoutRemakesInputObjectSchema: z.ZodType<Prisma.CaseCreateNestedOneWithoutRemakesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateNestedOneWithoutRemakesInput>;
export const CaseCreateNestedOneWithoutRemakesInputObjectZodSchema = makeSchema();
