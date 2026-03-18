import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUpdateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutSelectedTeethInput.schema';
import { CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema)]),
  where: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional()
}).strict();
export const CaseWorkItemUpsertWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpsertWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpsertWithoutSelectedTeethInput>;
export const CaseWorkItemUpsertWithoutSelectedTeethInputObjectZodSchema = makeSchema();
