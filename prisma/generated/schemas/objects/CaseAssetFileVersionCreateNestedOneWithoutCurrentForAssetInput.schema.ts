import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInput.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCurrentForAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCurrentForAssetInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCurrentForAssetInputObjectSchema).optional(),
  connect: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).optional()
}).strict();
export const CaseAssetFileVersionCreateNestedOneWithoutCurrentForAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateNestedOneWithoutCurrentForAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateNestedOneWithoutCurrentForAssetInput>;
export const CaseAssetFileVersionCreateNestedOneWithoutCurrentForAssetInputObjectZodSchema = makeSchema();
