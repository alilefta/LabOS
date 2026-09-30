import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutStoredFileInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema).optional(),
  connect: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInput>;
export const CaseAssetFileVersionUncheckedCreateNestedOneWithoutStoredFileInputObjectZodSchema = makeSchema();
