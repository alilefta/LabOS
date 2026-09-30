import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInput>;
export const CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectZodSchema = makeSchema();
