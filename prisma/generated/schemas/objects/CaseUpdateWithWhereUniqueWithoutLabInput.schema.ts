import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutLabInputObjectSchema as CaseUpdateWithoutLabInputObjectSchema } from './CaseUpdateWithoutLabInput.schema';
import { CaseUncheckedUpdateWithoutLabInputObjectSchema as CaseUncheckedUpdateWithoutLabInputObjectSchema } from './CaseUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutLabInput>;
export const CaseUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
