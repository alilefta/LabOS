import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutInvitationsInputObjectSchema as LabUpdateWithoutInvitationsInputObjectSchema } from './LabUpdateWithoutInvitationsInput.schema';
import { LabUncheckedUpdateWithoutInvitationsInputObjectSchema as LabUncheckedUpdateWithoutInvitationsInputObjectSchema } from './LabUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutInvitationsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutInvitationsInput>;
export const LabUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema = makeSchema();
