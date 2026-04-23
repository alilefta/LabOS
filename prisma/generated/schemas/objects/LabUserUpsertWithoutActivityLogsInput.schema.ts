import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserUpdateWithoutActivityLogsInputObjectSchema as LabUserUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUpdateWithoutActivityLogsInput.schema';
import { LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema as LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedUpdateWithoutActivityLogsInput.schema';
import { LabUserCreateWithoutActivityLogsInputObjectSchema as LabUserCreateWithoutActivityLogsInputObjectSchema } from './LabUserCreateWithoutActivityLogsInput.schema';
import { LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema as LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedCreateWithoutActivityLogsInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUserUpdateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabUserCreateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutActivityLogsInputObjectSchema)]),
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional()
}).strict();
export const LabUserUpsertWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserUpsertWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpsertWithoutActivityLogsInput>;
export const LabUserUpsertWithoutActivityLogsInputObjectZodSchema = makeSchema();
