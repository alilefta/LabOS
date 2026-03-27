import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutDentistsInputObjectSchema as LabCreateWithoutDentistsInputObjectSchema } from './LabCreateWithoutDentistsInput.schema';
import { LabUncheckedCreateWithoutDentistsInputObjectSchema as LabUncheckedCreateWithoutDentistsInputObjectSchema } from './LabUncheckedCreateWithoutDentistsInput.schema';
import { LabCreateOrConnectWithoutDentistsInputObjectSchema as LabCreateOrConnectWithoutDentistsInputObjectSchema } from './LabCreateOrConnectWithoutDentistsInput.schema';
import { LabUpsertWithoutDentistsInputObjectSchema as LabUpsertWithoutDentistsInputObjectSchema } from './LabUpsertWithoutDentistsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutDentistsInputObjectSchema as LabUpdateToOneWithWhereWithoutDentistsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutDentistsInput.schema';
import { LabUpdateWithoutDentistsInputObjectSchema as LabUpdateWithoutDentistsInputObjectSchema } from './LabUpdateWithoutDentistsInput.schema';
import { LabUncheckedUpdateWithoutDentistsInputObjectSchema as LabUncheckedUpdateWithoutDentistsInputObjectSchema } from './LabUncheckedUpdateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutDentistsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutDentistsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutDentistsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutDentistsInputObjectSchema), z.lazy(() => LabUpdateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutDentistsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutDentistsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutDentistsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutDentistsNestedInput>;
export const LabUpdateOneRequiredWithoutDentistsNestedInputObjectZodSchema = makeSchema();
