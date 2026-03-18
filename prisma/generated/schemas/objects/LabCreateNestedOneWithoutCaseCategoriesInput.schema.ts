import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseCategoriesInputObjectSchema as LabCreateWithoutCaseCategoriesInputObjectSchema } from './LabCreateWithoutCaseCategoriesInput.schema';
import { LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema as LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedCreateWithoutCaseCategoriesInput.schema';
import { LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema as LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema } from './LabCreateOrConnectWithoutCaseCategoriesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCaseCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCaseCategoriesInput>;
export const LabCreateNestedOneWithoutCaseCategoriesInputObjectZodSchema = makeSchema();
