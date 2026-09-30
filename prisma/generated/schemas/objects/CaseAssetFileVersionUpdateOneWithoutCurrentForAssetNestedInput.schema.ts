import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUpsertWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUpsertWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUpsertWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseAssetFileVersionUpsertWithoutCurrentForAssetInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateToOneWithWhereWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutCurrentForAssetInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInput>;
export const CaseAssetFileVersionUpdateOneWithoutCurrentForAssetNestedInputObjectZodSchema = makeSchema();
