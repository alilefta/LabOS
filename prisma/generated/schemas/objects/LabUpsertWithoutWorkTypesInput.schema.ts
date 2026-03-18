import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutWorkTypesInputObjectSchema as LabUpdateWithoutWorkTypesInputObjectSchema } from './LabUpdateWithoutWorkTypesInput.schema';
import { LabUncheckedUpdateWithoutWorkTypesInputObjectSchema as LabUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './LabUncheckedUpdateWithoutWorkTypesInput.schema';
import { LabCreateWithoutWorkTypesInputObjectSchema as LabCreateWithoutWorkTypesInputObjectSchema } from './LabCreateWithoutWorkTypesInput.schema';
import { LabUncheckedCreateWithoutWorkTypesInputObjectSchema as LabUncheckedCreateWithoutWorkTypesInputObjectSchema } from './LabUncheckedCreateWithoutWorkTypesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutWorkTypesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutWorkTypesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutWorkTypesInput>;
export const LabUpsertWithoutWorkTypesInputObjectZodSchema = makeSchema();
