import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountScalarWhereInputObjectSchema as AccountScalarWhereInputObjectSchema } from './AccountScalarWhereInput.schema';
import { AccountUpdateManyMutationInputObjectSchema as AccountUpdateManyMutationInputObjectSchema } from './AccountUpdateManyMutationInput.schema';
import { AccountUncheckedUpdateManyWithoutAuthuserInputObjectSchema as AccountUncheckedUpdateManyWithoutAuthuserInputObjectSchema } from './AccountUncheckedUpdateManyWithoutAuthuserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AccountUpdateManyMutationInputObjectSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutAuthuserInputObjectSchema)])
}).strict();
export const AccountUpdateManyWithWhereWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutAuthuserInput>;
export const AccountUpdateManyWithWhereWithoutAuthuserInputObjectZodSchema = makeSchema();
