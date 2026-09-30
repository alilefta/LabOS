import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUpdateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedUpdateWithoutCreatedByMemberInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
