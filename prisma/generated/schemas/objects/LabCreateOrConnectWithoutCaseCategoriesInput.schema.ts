import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCaseCategoriesInputObjectSchema as LabCreateWithoutCaseCategoriesInputObjectSchema } from './LabCreateWithoutCaseCategoriesInput.schema';
import { LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema as LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedCreateWithoutCaseCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCaseCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCaseCategoriesInput>;
export const LabCreateOrConnectWithoutCaseCategoriesInputObjectZodSchema = makeSchema();
