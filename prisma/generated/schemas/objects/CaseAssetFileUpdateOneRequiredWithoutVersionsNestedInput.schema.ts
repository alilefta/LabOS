import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileCreateWithoutVersionsInputObjectSchema as CaseAssetFileCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedCreateWithoutVersionsInput.schema';
import { CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema as CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema } from './CaseAssetFileCreateOrConnectWithoutVersionsInput.schema';
import { CaseAssetFileUpsertWithoutVersionsInputObjectSchema as CaseAssetFileUpsertWithoutVersionsInputObjectSchema } from './CaseAssetFileUpsertWithoutVersionsInput.schema';
import { CaseAssetFileWhereUniqueInputObjectSchema as CaseAssetFileWhereUniqueInputObjectSchema } from './CaseAssetFileWhereUniqueInput.schema';
import { CaseAssetFileUpdateToOneWithWhereWithoutVersionsInputObjectSchema as CaseAssetFileUpdateToOneWithWhereWithoutVersionsInputObjectSchema } from './CaseAssetFileUpdateToOneWithWhereWithoutVersionsInput.schema';
import { CaseAssetFileUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUpdateWithoutVersionsInput.schema';
import { CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema as CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema } from './CaseAssetFileUncheckedUpdateWithoutVersionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileCreateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedCreateWithoutVersionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CaseAssetFileCreateOrConnectWithoutVersionsInputObjectSchema).optional(),
  upsert: z.lazy(() => CaseAssetFileUpsertWithoutVersionsInputObjectSchema).optional(),
  connect: z.lazy(() => CaseAssetFileWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CaseAssetFileUpdateToOneWithWhereWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUpdateWithoutVersionsInputObjectSchema), z.lazy(() => CaseAssetFileUncheckedUpdateWithoutVersionsInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInput>;
export const CaseAssetFileUpdateOneRequiredWithoutVersionsNestedInputObjectZodSchema = makeSchema();
