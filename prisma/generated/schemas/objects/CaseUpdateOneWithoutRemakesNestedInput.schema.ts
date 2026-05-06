import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutRemakesInputObjectSchema as CaseCreateWithoutRemakesInputObjectSchema } from './CaseCreateWithoutRemakesInput.schema';
import { CaseUncheckedCreateWithoutRemakesInputObjectSchema as CaseUncheckedCreateWithoutRemakesInputObjectSchema } from './CaseUncheckedCreateWithoutRemakesInput.schema';
import { CaseCreateOrConnectWithoutRemakesInputObjectSchema as CaseCreateOrConnectWithoutRemakesInputObjectSchema } from './CaseCreateOrConnectWithoutRemakesInput.schema';
import { CaseUpsertWithoutRemakesInputObjectSchema as CaseUpsertWithoutRemakesInputObjectSchema } from './CaseUpsertWithoutRemakesInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateToOneWithWhereWithoutRemakesInputObjectSchema as CaseUpdateToOneWithWhereWithoutRemakesInputObjectSchema } from './CaseUpdateToOneWithWhereWithoutRemakesInput.schema';
import { CaseUpdateWithoutRemakesInputObjectSchema as CaseUpdateWithoutRemakesInputObjectSchema } from './CaseUpdateWithoutRemakesInput.schema';
import { CaseUncheckedUpdateWithoutRemakesInputObjectSchema as CaseUncheckedUpdateWithoutRemakesInputObjectSchema } from './CaseUncheckedUpdateWithoutRemakesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutRemakesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseCreateOrConnectWithoutRemakesInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseUpsertWithoutRemakesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseUpdateToOneWithWhereWithoutRemakesInputObjectSchema), z.lazy(() => CaseUpdateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutRemakesInputObjectSchema)]).optional()
}).strict();
export const CaseUpdateOneWithoutRemakesNestedInputObjectSchema: z.ZodType<Prisma.CaseUpdateOneWithoutRemakesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateOneWithoutRemakesNestedInput>;
export const CaseUpdateOneWithoutRemakesNestedInputObjectZodSchema = makeSchema();
