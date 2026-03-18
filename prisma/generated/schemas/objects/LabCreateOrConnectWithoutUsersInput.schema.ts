import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutUsersInputObjectSchema as LabCreateWithoutUsersInputObjectSchema } from './LabCreateWithoutUsersInput.schema';
import { LabUncheckedCreateWithoutUsersInputObjectSchema as LabUncheckedCreateWithoutUsersInputObjectSchema } from './LabUncheckedCreateWithoutUsersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutUsersInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutUsersInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutUsersInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutUsersInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutUsersInput>;
export const LabCreateOrConnectWithoutUsersInputObjectZodSchema = makeSchema();
