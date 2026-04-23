import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutActorInputObjectSchema as CaseActivityLogUpdateWithoutActorInputObjectSchema } from './CaseActivityLogUpdateWithoutActorInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutActorInput.schema';
import { CaseActivityLogCreateWithoutActorInputObjectSchema as CaseActivityLogCreateWithoutActorInputObjectSchema } from './CaseActivityLogCreateWithoutActorInput.schema';
import { CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema as CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutActorInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutActorInput>;
export const CaseActivityLogUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
