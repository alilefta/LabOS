import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountWhereUniqueInputObjectSchema as AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema';
import { AccountUpdateWithoutAuthuserInputObjectSchema as AccountUpdateWithoutAuthuserInputObjectSchema } from './AccountUpdateWithoutAuthuserInput.schema';
import { AccountUncheckedUpdateWithoutAuthuserInputObjectSchema as AccountUncheckedUpdateWithoutAuthuserInputObjectSchema } from './AccountUncheckedUpdateWithoutAuthuserInput.schema';
import { AccountCreateWithoutAuthuserInputObjectSchema as AccountCreateWithoutAuthuserInputObjectSchema } from './AccountCreateWithoutAuthuserInput.schema';
import { AccountUncheckedCreateWithoutAuthuserInputObjectSchema as AccountUncheckedCreateWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AccountUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedUpdateWithoutAuthuserInputObjectSchema)]),
  create: z.union([z.lazy(() => AccountCreateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedCreateWithoutAuthuserInputObjectSchema)])
}).strict();
export const AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutAuthuserInput>;
export const AccountUpsertWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
