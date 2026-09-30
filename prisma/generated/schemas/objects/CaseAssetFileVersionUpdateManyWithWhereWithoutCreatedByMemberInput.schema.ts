import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionScalarWhereInputObjectSchema as CaseAssetFileVersionScalarWhereInputObjectSchema } from './CaseAssetFileVersionScalarWhereInput.schema';
import { CaseAssetFileVersionUpdateManyMutationInputObjectSchema as CaseAssetFileVersionUpdateManyMutationInputObjectSchema } from './CaseAssetFileVersionUpdateManyMutationInput.schema';
import { CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateManyMutationInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateManyWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
