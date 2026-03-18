import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutUsersInputObjectSchema as LabCreateWithoutUsersInputObjectSchema } from './LabCreateWithoutUsersInput.schema';
import { LabUncheckedCreateWithoutUsersInputObjectSchema as LabUncheckedCreateWithoutUsersInputObjectSchema } from './LabUncheckedCreateWithoutUsersInput.schema';
import { LabCreateOrConnectWithoutUsersInputObjectSchema as LabCreateOrConnectWithoutUsersInputObjectSchema } from './LabCreateOrConnectWithoutUsersInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutUsersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutUsersInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutUsersInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutUsersInput>;
export const LabCreateNestedOneWithoutUsersInputObjectZodSchema = makeSchema();
