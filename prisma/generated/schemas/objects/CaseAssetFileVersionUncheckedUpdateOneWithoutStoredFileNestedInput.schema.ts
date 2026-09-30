import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUpsertWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUpsertWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUpsertWithoutStoredFileInput.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseAssetFileVersionUpsertWithoutStoredFileInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateToOneWithWhereWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutStoredFileInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInput>;
export const CaseAssetFileVersionUncheckedUpdateOneWithoutStoredFileNestedInputObjectZodSchema = makeSchema();
