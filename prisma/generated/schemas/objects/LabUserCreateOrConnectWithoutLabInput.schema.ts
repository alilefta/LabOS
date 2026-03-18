import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserCreateWithoutLabInputObjectSchema as LabUserCreateWithoutLabInputObjectSchema } from './LabUserCreateWithoutLabInput.schema';
import { LabUserUncheckedCreateWithoutLabInputObjectSchema as LabUserUncheckedCreateWithoutLabInputObjectSchema } from './LabUserUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabUserCreateWithoutLabInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const LabUserCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateOrConnectWithoutLabInput>;
export const LabUserCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
