import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutAssetInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutAssetInput.schema';
import { CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema as CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema } from './CaseAssetFileVersionCreateManyAssetInputEnvelope.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateWithoutAssetInputObjectSchema).array(), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutAssetInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutAssetInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileVersionCreateManyAssetInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInput>;
export const CaseAssetFileVersionUncheckedCreateNestedManyWithoutAssetInputObjectZodSchema = makeSchema();
