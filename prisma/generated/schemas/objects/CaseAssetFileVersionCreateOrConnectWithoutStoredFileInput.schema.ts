import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionCreateWithoutStoredFileInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutStoredFileInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutStoredFileInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutStoredFileInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutStoredFileInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutStoredFileInput>;
export const CaseAssetFileVersionCreateOrConnectWithoutStoredFileInputObjectZodSchema = makeSchema();
