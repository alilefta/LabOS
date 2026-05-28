import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutInvitationsInputObjectSchema as LabCreateWithoutInvitationsInputObjectSchema } from './LabCreateWithoutInvitationsInput.schema';
import { LabUncheckedCreateWithoutInvitationsInputObjectSchema as LabUncheckedCreateWithoutInvitationsInputObjectSchema } from './LabUncheckedCreateWithoutInvitationsInput.schema';
import { LabCreateOrConnectWithoutInvitationsInputObjectSchema as LabCreateOrConnectWithoutInvitationsInputObjectSchema } from './LabCreateOrConnectWithoutInvitationsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutInvitationsInput>;
export const LabCreateNestedOneWithoutInvitationsInputObjectZodSchema = makeSchema();
