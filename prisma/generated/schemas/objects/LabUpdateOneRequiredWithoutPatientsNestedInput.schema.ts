import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutPatientsInputObjectSchema as LabCreateWithoutPatientsInputObjectSchema } from './LabCreateWithoutPatientsInput.schema';
import { LabUncheckedCreateWithoutPatientsInputObjectSchema as LabUncheckedCreateWithoutPatientsInputObjectSchema } from './LabUncheckedCreateWithoutPatientsInput.schema';
import { LabCreateOrConnectWithoutPatientsInputObjectSchema as LabCreateOrConnectWithoutPatientsInputObjectSchema } from './LabCreateOrConnectWithoutPatientsInput.schema';
import { LabUpsertWithoutPatientsInputObjectSchema as LabUpsertWithoutPatientsInputObjectSchema } from './LabUpsertWithoutPatientsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutPatientsInputObjectSchema as LabUpdateToOneWithWhereWithoutPatientsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutPatientsInput.schema';
import { LabUpdateWithoutPatientsInputObjectSchema as LabUpdateWithoutPatientsInputObjectSchema } from './LabUpdateWithoutPatientsInput.schema';
import { LabUncheckedUpdateWithoutPatientsInputObjectSchema as LabUncheckedUpdateWithoutPatientsInputObjectSchema } from './LabUncheckedUpdateWithoutPatientsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutPatientsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutPatientsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutPatientsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutPatientsInputObjectSchema), z.lazy(() => LabUpdateWithoutPatientsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutPatientsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutPatientsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutPatientsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutPatientsNestedInput>;
export const LabUpdateOneRequiredWithoutPatientsNestedInputObjectZodSchema = makeSchema();
