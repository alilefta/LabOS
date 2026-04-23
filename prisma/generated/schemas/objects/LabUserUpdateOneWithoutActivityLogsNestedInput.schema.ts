import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutActivityLogsInputObjectSchema as LabUserCreateWithoutActivityLogsInputObjectSchema } from './LabUserCreateWithoutActivityLogsInput.schema';
import { LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema as LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedCreateWithoutActivityLogsInput.schema';
import { LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema as LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema } from './LabUserCreateOrConnectWithoutActivityLogsInput.schema';
import { LabUserUpsertWithoutActivityLogsInputObjectSchema as LabUserUpsertWithoutActivityLogsInputObjectSchema } from './LabUserUpsertWithoutActivityLogsInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateToOneWithWhereWithoutActivityLogsInputObjectSchema as LabUserUpdateToOneWithWhereWithoutActivityLogsInputObjectSchema } from './LabUserUpdateToOneWithWhereWithoutActivityLogsInput.schema';
import { LabUserUpdateWithoutActivityLogsInputObjectSchema as LabUserUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUpdateWithoutActivityLogsInput.schema';
import { LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema as LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedUpdateWithoutActivityLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutActivityLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUserUpsertWithoutActivityLogsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUserUpdateToOneWithWhereWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUpdateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema)]).optional()
}).strict();
export const LabUserUpdateOneWithoutActivityLogsNestedInputObjectSchema: z.ZodType<Prisma.LabUserUpdateOneWithoutActivityLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateOneWithoutActivityLogsNestedInput>;
export const LabUserUpdateOneWithoutActivityLogsNestedInputObjectZodSchema = makeSchema();
