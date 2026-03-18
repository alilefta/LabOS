import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSelectedTeethInputObjectSchema as LabCreateWithoutSelectedTeethInputObjectSchema } from './LabCreateWithoutSelectedTeethInput.schema';
import { LabUncheckedCreateWithoutSelectedTeethInputObjectSchema as LabUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedCreateWithoutSelectedTeethInput.schema';
import { LabCreateOrConnectWithoutSelectedTeethInputObjectSchema as LabCreateOrConnectWithoutSelectedTeethInputObjectSchema } from './LabCreateOrConnectWithoutSelectedTeethInput.schema';
import { LabUpsertWithoutSelectedTeethInputObjectSchema as LabUpsertWithoutSelectedTeethInputObjectSchema } from './LabUpsertWithoutSelectedTeethInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema as LabUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema } from './LabUpdateToOneWithWhereWithoutSelectedTeethInput.schema';
import { LabUpdateWithoutSelectedTeethInputObjectSchema as LabUpdateWithoutSelectedTeethInputObjectSchema } from './LabUpdateWithoutSelectedTeethInput.schema';
import { LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema as LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedUpdateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSelectedTeethInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSelectedTeethInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutSelectedTeethInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutSelectedTeethNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutSelectedTeethNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutSelectedTeethNestedInput>;
export const LabUpdateOneRequiredWithoutSelectedTeethNestedInputObjectZodSchema = makeSchema();
