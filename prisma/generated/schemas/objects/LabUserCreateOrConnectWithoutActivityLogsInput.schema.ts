import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserCreateWithoutActivityLogsInputObjectSchema as LabUserCreateWithoutActivityLogsInputObjectSchema } from './LabUserCreateWithoutActivityLogsInput.schema';
import { LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema as LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedCreateWithoutActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabUserCreateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema)])
}).strict();
export const LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserCreateOrConnectWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateOrConnectWithoutActivityLogsInput>;
export const LabUserCreateOrConnectWithoutActivityLogsInputObjectZodSchema = makeSchema();
