import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutClinicsInputObjectSchema as LabCreateWithoutClinicsInputObjectSchema } from './LabCreateWithoutClinicsInput.schema';
import { LabUncheckedCreateWithoutClinicsInputObjectSchema as LabUncheckedCreateWithoutClinicsInputObjectSchema } from './LabUncheckedCreateWithoutClinicsInput.schema';
import { LabCreateOrConnectWithoutClinicsInputObjectSchema as LabCreateOrConnectWithoutClinicsInputObjectSchema } from './LabCreateOrConnectWithoutClinicsInput.schema';
import { LabUpsertWithoutClinicsInputObjectSchema as LabUpsertWithoutClinicsInputObjectSchema } from './LabUpsertWithoutClinicsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutClinicsInputObjectSchema as LabUpdateToOneWithWhereWithoutClinicsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutClinicsInput.schema';
import { LabUpdateWithoutClinicsInputObjectSchema as LabUpdateWithoutClinicsInputObjectSchema } from './LabUpdateWithoutClinicsInput.schema';
import { LabUncheckedUpdateWithoutClinicsInputObjectSchema as LabUncheckedUpdateWithoutClinicsInputObjectSchema } from './LabUncheckedUpdateWithoutClinicsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutClinicsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutClinicsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutClinicsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutClinicsInputObjectSchema), z.lazy(() => LabUpdateWithoutClinicsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutClinicsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutClinicsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutClinicsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutClinicsNestedInput>;
export const LabUpdateOneRequiredWithoutClinicsNestedInputObjectZodSchema = makeSchema();
