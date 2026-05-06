import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutRemakesInputObjectSchema as CaseUpdateWithoutRemakesInputObjectSchema } from './CaseUpdateWithoutRemakesInput.schema';
import { CaseUncheckedUpdateWithoutRemakesInputObjectSchema as CaseUncheckedUpdateWithoutRemakesInputObjectSchema } from './CaseUncheckedUpdateWithoutRemakesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutRemakesInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutRemakesInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutRemakesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutRemakesInput>;
export const CaseUpdateToOneWithWhereWithoutRemakesInputObjectZodSchema = makeSchema();
