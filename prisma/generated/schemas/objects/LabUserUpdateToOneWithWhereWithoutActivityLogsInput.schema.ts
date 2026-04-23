import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserUpdateWithoutActivityLogsInputObjectSchema as LabUserUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUpdateWithoutActivityLogsInput.schema';
import { LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema as LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema } from './LabUserUncheckedUpdateWithoutActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabUserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUserUpdateWithoutActivityLogsInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutActivityLogsInputObjectSchema)])
}).strict();
export const LabUserUpdateToOneWithWhereWithoutActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUpdateToOneWithWhereWithoutActivityLogsInput>;
export const LabUserUpdateToOneWithWhereWithoutActivityLogsInputObjectZodSchema = makeSchema();
