import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutUsersInputObjectSchema as LabUpdateWithoutUsersInputObjectSchema } from './LabUpdateWithoutUsersInput.schema';
import { LabUncheckedUpdateWithoutUsersInputObjectSchema as LabUncheckedUpdateWithoutUsersInputObjectSchema } from './LabUncheckedUpdateWithoutUsersInput.schema';
import { LabCreateWithoutUsersInputObjectSchema as LabCreateWithoutUsersInputObjectSchema } from './LabCreateWithoutUsersInput.schema';
import { LabUncheckedCreateWithoutUsersInputObjectSchema as LabUncheckedCreateWithoutUsersInputObjectSchema } from './LabUncheckedCreateWithoutUsersInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutUsersInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutUsersInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutUsersInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutUsersInput>;
export const LabUpsertWithoutUsersInputObjectZodSchema = makeSchema();
