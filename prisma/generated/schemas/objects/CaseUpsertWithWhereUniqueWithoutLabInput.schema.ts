import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutLabInputObjectSchema as CaseUpdateWithoutLabInputObjectSchema } from './CaseUpdateWithoutLabInput.schema';
import { CaseUncheckedUpdateWithoutLabInputObjectSchema as CaseUncheckedUpdateWithoutLabInputObjectSchema } from './CaseUncheckedUpdateWithoutLabInput.schema';
import { CaseCreateWithoutLabInputObjectSchema as CaseCreateWithoutLabInputObjectSchema } from './CaseCreateWithoutLabInput.schema';
import { CaseUncheckedCreateWithoutLabInputObjectSchema as CaseUncheckedCreateWithoutLabInputObjectSchema } from './CaseUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutLabInput>;
export const CaseUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
