import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutInvitationsInputObjectSchema as LabUpdateWithoutInvitationsInputObjectSchema } from './LabUpdateWithoutInvitationsInput.schema';
import { LabUncheckedUpdateWithoutInvitationsInputObjectSchema as LabUncheckedUpdateWithoutInvitationsInputObjectSchema } from './LabUncheckedUpdateWithoutInvitationsInput.schema';
import { LabCreateWithoutInvitationsInputObjectSchema as LabCreateWithoutInvitationsInputObjectSchema } from './LabCreateWithoutInvitationsInput.schema';
import { LabUncheckedCreateWithoutInvitationsInputObjectSchema as LabUncheckedCreateWithoutInvitationsInputObjectSchema } from './LabUncheckedCreateWithoutInvitationsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvitationsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvitationsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutInvitationsInput>;
export const LabUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
