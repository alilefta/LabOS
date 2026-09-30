import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutCurrentVersionInput.schema';
import { CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema as CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutCurrentVersionInput.schema';
import { CaseAssetFileUpsertWithoutCurrentVersionInputObjectSchema as CaseAssetFileUpsertWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUpsertWithoutCurrentVersionInput.schema';
import { CaseAssetFileWhereInputObjectSchema as CaseAssetFileWhereInputObjectSchema } from './CaseAssetFileWhereInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInputObjectSchema as CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInput.schema';
import { CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUpdateWithoutCurrentVersionInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutCurrentVersionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutCurrentVersionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileCreateOrConnectWithoutCurrentVersionInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseAssetFileUpsertWithoutCurrentVersionInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseAssetFileWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseAssetFileWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseAssetFileUpdateToOneWithWhereWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUpdateWithoutCurrentVersionInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutCurrentVersionInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileUpdateOneWithoutCurrentVersionNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateOneWithoutCurrentVersionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateOneWithoutCurrentVersionNestedInput>;
export const CaseAssetFileUpdateOneWithoutCurrentVersionNestedInputObjectZodSchema = makeSchema();
