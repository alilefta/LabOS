import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountCreateWithoutAuthuserInputObjectSchema as AccountCreateWithoutAuthuserInputObjectSchema } from './AccountCreateWithoutAuthuserInput.schema';
import { AccountUncheckedCreateWithoutAuthuserInputObjectSchema as AccountUncheckedCreateWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateWithoutAuthuserInput.schema';
import { AccountCreateOrConnectWithoutAuthuserInputObjectSchema as AccountCreateOrConnectWithoutAuthuserInputObjectSchema } from './AccountCreateOrConnectWithoutAuthuserInput.schema';
import { AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema as AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema } from './AccountUpsertWithWhereUniqueWithoutAuthuserInput.schema';
import { AccountCreateManyAuthuserInputEnvelopeObjectSchema as AccountCreateManyAuthuserInputEnvelopeObjectSchema } from './AccountCreateManyAuthuserInputEnvelope.schema';
import { AccountWhereUniqueInputObjectSchema as AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema';
import { AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema as AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema } from './AccountUpdateWithWhereUniqueWithoutAuthuserInput.schema';
import { AccountUpdateManyWithWhereWithoutAuthuserInputObjectSchema as AccountUpdateManyWithWhereWithoutAuthuserInputObjectSchema } from './AccountUpdateManyWithWhereWithoutAuthuserInput.schema';
import { AccountScalarWhereInputObjectSchema as AccountScalarWhereInputObjectSchema } from './AccountScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => AccountCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputObjectSchema), z.lazy(() => AccountWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputObjectSchema), z.lazy(() => AccountWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputObjectSchema), z.lazy(() => AccountWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputObjectSchema), z.lazy(() => AccountWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutAuthuserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputObjectSchema), z.lazy(() => AccountScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AccountUncheckedUpdateManyWithoutAuthuserNestedInputObjectSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAuthuserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutAuthuserNestedInput>;
export const AccountUncheckedUpdateManyWithoutAuthuserNestedInputObjectZodSchema = makeSchema();
