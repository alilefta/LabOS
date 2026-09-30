import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
