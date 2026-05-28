import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvitationsInputObjectSchema as LabCreateWithoutInvitationsInputObjectSchema } from './LabCreateWithoutInvitationsInput.schema';
import { LabUncheckedCreateWithoutInvitationsInputObjectSchema as LabUncheckedCreateWithoutInvitationsInputObjectSchema } from './LabUncheckedCreateWithoutInvitationsInput.schema';
import { LabCreateOrConnectWithoutInvitationsInputObjectSchema as LabCreateOrConnectWithoutInvitationsInputObjectSchema } from './LabCreateOrConnectWithoutInvitationsInput.schema';
import { LabUpsertWithoutInvitationsInputObjectSchema as LabUpsertWithoutInvitationsInputObjectSchema } from './LabUpsertWithoutInvitationsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutInvitationsInputObjectSchema as LabUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutInvitationsInput.schema';
import { LabUpdateWithoutInvitationsInputObjectSchema as LabUpdateWithoutInvitationsInputObjectSchema } from './LabUpdateWithoutInvitationsInput.schema';
import { LabUncheckedUpdateWithoutInvitationsInputObjectSchema as LabUncheckedUpdateWithoutInvitationsInputObjectSchema } from './LabUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutInvitationsInputObjectSchema), z.lazy(() => LabUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvitationsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvitationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutInvitationsNestedInput>;
export const LabUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema = makeSchema();
