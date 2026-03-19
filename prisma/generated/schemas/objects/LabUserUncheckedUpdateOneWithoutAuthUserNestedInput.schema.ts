import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCreateWithoutAuthUserInputObjectSchema as LabUserCreateWithoutAuthUserInputObjectSchema } from './LabUserCreateWithoutAuthUserInput.schema';
import { LabUserUncheckedCreateWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateWithoutAuthUserInput.schema';
import { LabUserCreateOrConnectWithoutAuthUserInputObjectSchema as LabUserCreateOrConnectWithoutAuthUserInputObjectSchema } from './LabUserCreateOrConnectWithoutAuthUserInput.schema';
import { LabUserUpsertWithoutAuthUserInputObjectSchema as LabUserUpsertWithoutAuthUserInputObjectSchema } from './LabUserUpsertWithoutAuthUserInput.schema';
import { LabUserWhereInputObjectSchema as LabUserWhereInputObjectSchema } from './LabUserWhereInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './LabUserWhereUniqueInput.schema';
import { LabUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema as LabUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema } from './LabUserUpdateToOneWithWhereWithoutAuthUserInput.schema';
import { LabUserUpdateWithoutAuthUserInputObjectSchema as LabUserUpdateWithoutAuthUserInputObjectSchema } from './LabUserUpdateWithoutAuthUserInput.schema';
import { LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema as LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema } from './LabUserUncheckedUpdateWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabUserCreateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedCreateWithoutAuthUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabUserCreateOrConnectWithoutAuthUserInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUserUpsertWithoutAuthUserInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabUserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabUserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUserUpdateToOneWithWhereWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUpdateWithoutAuthUserInputObjectSchema), z.lazy(() => LabUserUncheckedUpdateWithoutAuthUserInputObjectSchema)]).optional()
}).strict();
export const LabUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectSchema: z.ZodType<Prisma.LabUserUncheckedUpdateOneWithoutAuthUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserUncheckedUpdateOneWithoutAuthUserNestedInput>;
export const LabUserUncheckedUpdateOneWithoutAuthUserNestedInputObjectZodSchema = makeSchema();
