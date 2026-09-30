import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema as CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema } from './CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelope.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema).array(), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInput>;
export const CaseAssetFileVersionUncheckedCreateNestedManyWithoutCreatedByMemberInputObjectZodSchema = makeSchema();
