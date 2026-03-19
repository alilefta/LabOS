import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountWhereUniqueInputObjectSchema as AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema';
import { AccountCreateWithoutAuthuserInputObjectSchema as AccountCreateWithoutAuthuserInputObjectSchema } from './AccountCreateWithoutAuthuserInput.schema';
import { AccountUncheckedCreateWithoutAuthuserInputObjectSchema as AccountUncheckedCreateWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const AccountCreateOrConnectWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountCreateOrConnectWithoutAuthuserInput>;
export const AccountCreateOrConnectWithoutAuthuserInputObjectZodSchema = makeSchema();
