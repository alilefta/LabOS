import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemWhereInputObjectSchema as CaseWorkItemWhereInputObjectSchema } from './CaseWorkItemWhereInput.schema';
import { CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUpdateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWorkItemWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema)])
}).strict();
export const CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInput>;
export const CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInputObjectZodSchema = makeSchema();
