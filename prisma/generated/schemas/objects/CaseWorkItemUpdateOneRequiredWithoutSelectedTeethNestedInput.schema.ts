import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedCreateWithoutSelectedTeethInput.schema';
import { CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema as CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemCreateOrConnectWithoutSelectedTeethInput.schema';
import { CaseWorkItemUpsertWithoutSelectedTeethInputObjectSchema as CaseWorkItemUpsertWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUpsertWithoutSelectedTeethInput.schema';
import { CaseWorkItemWhereUniqueInputObjectSchema as CaseWorkItemWhereUniqueInputObjectSchema } from './CaseWorkItemWhereUniqueInput.schema';
import { CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema as CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInput.schema';
import { CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUpdateWithoutSelectedTeethInput.schema';
import { CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema as CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './CaseWorkItemUncheckedUpdateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseWorkItemCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedCreateWithoutSelectedTeethInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseWorkItemCreateOrConnectWithoutSelectedTeethInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseWorkItemUpsertWithoutSelectedTeethInputObjectSchema).optional(),
  connect: z.lazy(() => CaseWorkItemWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseWorkItemUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => CaseWorkItemUncheckedUpdateWithoutSelectedTeethInputObjectSchema)]).optional()
}).strict();
export const CaseWorkItemUpdateOneRequiredWithoutSelectedTeethNestedInputObjectSchema: z.ZodType<Prisma.CaseWorkItemUpdateOneRequiredWithoutSelectedTeethNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemUpdateOneRequiredWithoutSelectedTeethNestedInput>;
export const CaseWorkItemUpdateOneRequiredWithoutSelectedTeethNestedInputObjectZodSchema = makeSchema();
