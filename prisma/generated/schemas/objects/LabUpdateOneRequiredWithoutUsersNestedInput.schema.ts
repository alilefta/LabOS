import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutUsersInputObjectSchema as LabCreateWithoutUsersInputObjectSchema } from './LabCreateWithoutUsersInput.schema';
import { LabUncheckedCreateWithoutUsersInputObjectSchema as LabUncheckedCreateWithoutUsersInputObjectSchema } from './LabUncheckedCreateWithoutUsersInput.schema';
import { LabCreateOrConnectWithoutUsersInputObjectSchema as LabCreateOrConnectWithoutUsersInputObjectSchema } from './LabCreateOrConnectWithoutUsersInput.schema';
import { LabUpsertWithoutUsersInputObjectSchema as LabUpsertWithoutUsersInputObjectSchema } from './LabUpsertWithoutUsersInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutUsersInputObjectSchema as LabUpdateToOneWithWhereWithoutUsersInputObjectSchema } from './LabUpdateToOneWithWhereWithoutUsersInput.schema';
import { LabUpdateWithoutUsersInputObjectSchema as LabUpdateWithoutUsersInputObjectSchema } from './LabUpdateWithoutUsersInput.schema';
import { LabUncheckedUpdateWithoutUsersInputObjectSchema as LabUncheckedUpdateWithoutUsersInputObjectSchema } from './LabUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutUsersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutUsersInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutUsersInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutUsersInputObjectSchema), z.lazy(() => LabUpdateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutUsersInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutUsersNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutUsersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutUsersNestedInput>;
export const LabUpdateOneRequiredWithoutUsersNestedInputObjectZodSchema = makeSchema();
