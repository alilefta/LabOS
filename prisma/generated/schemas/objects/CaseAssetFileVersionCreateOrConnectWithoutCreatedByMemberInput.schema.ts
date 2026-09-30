import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema)])
}).strict();
export const CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
