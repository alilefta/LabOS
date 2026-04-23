import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutActivityLogsInputObjectSchema as LabUserCreateWithoutActivityLogsInputObjectSchema } from './LabUserCreateWithoutActivityLogsInput.schema';
import { LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema as LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedCreateWithoutActivityLogsInput.schema';
import { LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema as LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema } from './LabUserCreateOrConnectWithoutActivityLogsInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabUserCreateNestedOneWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserCreateNestedOneWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateNestedOneWithoutActivityLogsInput>;
export const LabUserCreateNestedOneWithoutActivityLogsInputObjectZodSchema = makeSchema();
