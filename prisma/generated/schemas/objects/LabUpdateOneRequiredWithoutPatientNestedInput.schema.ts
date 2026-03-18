import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutPatientInputObjectSchema as LabCreateWithoutPatientInputObjectSchema } from './LabCreateWithoutPatientInput.schema';
import { LabUncheckedCreateWithoutPatientInputObjectSchema as LabUncheckedCreateWithoutPatientInputObjectSchema } from './LabUncheckedCreateWithoutPatientInput.schema';
import { LabCreateOrConnectWithoutPatientInputObjectSchema as LabCreateOrConnectWithoutPatientInputObjectSchema } from './LabCreateOrConnectWithoutPatientInput.schema';
import { LabUpsertWithoutPatientInputObjectSchema as LabUpsertWithoutPatientInputObjectSchema } from './LabUpsertWithoutPatientInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutPatientInputObjectSchema as LabUpdateToOneWithWhereWithoutPatientInputObjectSchema } from './LabUpdateToOneWithWhereWithoutPatientInput.schema';
import { LabUpdateWithoutPatientInputObjectSchema as LabUpdateWithoutPatientInputObjectSchema } from './LabUpdateWithoutPatientInput.schema';
import { LabUncheckedUpdateWithoutPatientInputObjectSchema as LabUncheckedUpdateWithoutPatientInputObjectSchema } from './LabUncheckedUpdateWithoutPatientInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutPatientInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutPatientInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutPatientInputObjectSchema), z.lazy(() => LabUpdateWithoutPatientInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutPatientNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutPatientNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutPatientNestedInput>;
export const LabUpdateOneRequiredWithoutPatientNestedInputObjectZodSchema = makeSchema();
