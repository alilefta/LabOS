import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutAssetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutAssetInput>;
export const CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectZodSchema = makeSchema();
