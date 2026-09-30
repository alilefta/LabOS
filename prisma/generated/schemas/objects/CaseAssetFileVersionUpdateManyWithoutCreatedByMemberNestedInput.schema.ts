import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema as CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema } from './CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelope.schema';
import { CaseAssetFileVersionWhereUniqueInputObjectSchema as CaseAssetFileVersionWhereUniqueInputObjectSchema } from './CaseAssetFileVersionWhereUniqueInput.schema';
import { CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema as CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema } from './CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInput.schema';
import { CaseAssetFileVersionScalarWhereInputObjectSchema as CaseAssetFileVersionScalarWhereInputObjectSchema } from './CaseAssetFileVersionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateWithoutCreatedByMemberInputObjectSchema).array(), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUncheckedCreateWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionCreateOrConnectWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpsertWithWhereUniqueWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseAssetFileVersionCreateManyCreatedByMemberInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema), z.lazy(() => CaseAssetFileVersionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateWithWhereUniqueWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema), z.lazy(() => CaseAssetFileVersionUpdateManyWithWhereWithoutCreatedByMemberInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileVersionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInput>;
export const CaseAssetFileVersionUpdateManyWithoutCreatedByMemberNestedInputObjectZodSchema = makeSchema();
