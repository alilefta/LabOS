import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutDentistsInputObjectSchema as LabUpdateWithoutDentistsInputObjectSchema } from './LabUpdateWithoutDentistsInput.schema';
import { LabUncheckedUpdateWithoutDentistsInputObjectSchema as LabUncheckedUpdateWithoutDentistsInputObjectSchema } from './LabUncheckedUpdateWithoutDentistsInput.schema';
import { LabCreateWithoutDentistsInputObjectSchema as LabCreateWithoutDentistsInputObjectSchema } from './LabCreateWithoutDentistsInput.schema';
import { LabUncheckedCreateWithoutDentistsInputObjectSchema as LabUncheckedCreateWithoutDentistsInputObjectSchema } from './LabUncheckedCreateWithoutDentistsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutDentistsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutDentistsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutDentistsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutDentistsInput>;
export const LabUpsertWithoutDentistsInputObjectZodSchema = makeSchema();
