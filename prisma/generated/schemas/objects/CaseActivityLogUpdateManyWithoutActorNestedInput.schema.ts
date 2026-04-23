import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutActorInputObjectSchema as CaseActivityLogCreateWithoutActorInputObjectSchema } from './CaseActivityLogCreateWithoutActorInput.schema';
import { CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema as CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutActorInput.schema';
import { CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema as CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutActorInput.schema';
import { CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectSchema as CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectSchema } from './CaseActivityLogUpsertWithWhereUniqueWithoutActorInput.schema';
import { CaseActivityLogCreateManyActorInputEnvelopeObjectSchema as CaseActivityLogCreateManyActorInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyActorInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectSchema as CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectSchema } from './CaseActivityLogUpdateWithWhereUniqueWithoutActorInput.schema';
import { CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectSchema as CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectSchema } from './CaseActivityLogUpdateManyWithWhereWithoutActorInput.schema';
import { CaseActivityLogScalarWhereInputObjectSchema as CaseActivityLogScalarWhereInputObjectSchema } from './CaseActivityLogScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutActorInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyActorInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUpdateWithWhereUniqueWithoutActorInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUpdateManyWithWhereWithoutActorInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema), z.lazy(() => CaseActivityLogScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUpdateManyWithoutActorNestedInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateManyWithoutActorNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateManyWithoutActorNestedInput>;
export const CaseActivityLogUpdateManyWithoutActorNestedInputObjectZodSchema = makeSchema();
