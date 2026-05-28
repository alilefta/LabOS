import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutInvitationsInputObjectSchema as LabCreateWithoutInvitationsInputObjectSchema } from './LabCreateWithoutInvitationsInput.schema';
import { LabUncheckedCreateWithoutInvitationsInputObjectSchema as LabUncheckedCreateWithoutInvitationsInputObjectSchema } from './LabUncheckedCreateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutInvitationsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutInvitationsInput>;
export const LabCreateOrConnectWithoutInvitationsInputObjectZodSchema = makeSchema();
