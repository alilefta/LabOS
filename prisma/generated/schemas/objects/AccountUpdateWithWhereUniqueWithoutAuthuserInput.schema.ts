import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountWhereUniqueInputObjectSchema as AccountWhereUniqueInputObjectSchema } from './AccountWhereUniqueInput.schema';
import { AccountUpdateWithoutAuthuserInputObjectSchema as AccountUpdateWithoutAuthuserInputObjectSchema } from './AccountUpdateWithoutAuthuserInput.schema';
import { AccountUncheckedUpdateWithoutAuthuserInputObjectSchema as AccountUncheckedUpdateWithoutAuthuserInputObjectSchema } from './AccountUncheckedUpdateWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AccountUpdateWithoutAuthuserInputObjectSchema), z.lazy(() => AccountUncheckedUpdateWithoutAuthuserInputObjectSchema)])
}).strict();
export const AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutAuthuserInput>;
export const AccountUpdateWithWhereUniqueWithoutAuthuserInputObjectZodSchema = makeSchema();
