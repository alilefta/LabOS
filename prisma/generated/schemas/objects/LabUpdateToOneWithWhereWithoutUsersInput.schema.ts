import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutUsersInputObjectSchema as LabUpdateWithoutUsersInputObjectSchema } from './LabUpdateWithoutUsersInput.schema';
import { LabUncheckedUpdateWithoutUsersInputObjectSchema as LabUncheckedUpdateWithoutUsersInputObjectSchema } from './LabUncheckedUpdateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutUsersInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutUsersInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutUsersInput>;
export const LabUpdateToOneWithWhereWithoutUsersInputObjectZodSchema = makeSchema();
