import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountCreateWithoutAuthuserInputObjectSchema as AccountCreateWithoutAuthuserInputObjectSchema } from './AccountCreateWithoutAuthuserInput.schema';
import { AccountUncheckedCreateWithoutAuthuserInputObjectSchema as AccountUncheckedCreateWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateWithoutAuthuserInput.schema';
import { AccountCreateOrConnectWithoutAuthuserInputObjectSchema as AccountCreateOrConnectWithoutAuthuserInputObjectSchema } from './AccountCreateOrConnectWithoutAuthuserInput.schema';
import { AccountCreateManyAuthuserInputEnvelopeObjectSchema as AccountCreateManyAuthuserInputEnvelopeObjectSchema } from './AccountCreateManyAuthuserInputEnvelope.schema';
import { AccountWhereUniqueInputObjectSchema as AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutAuthuserInputObjectSchema), z.lazy(() => AccountCreateOrConnectWithoutAuthuserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyAuthuserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputObjectSchema), z.lazy(() => AccountWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutAuthuserInput>;
export const AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectZodSchema = makeSchema();
