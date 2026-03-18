import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserUpdateInputObjectSchema as LabUserUpdateInputObjectSchema } from './objects/LabUserUpdateInput.schema';
import { LabUserUncheckedUpdateInputObjectSchema as LabUserUncheckedUpdateInputObjectSchema } from './objects/LabUserUncheckedUpdateInput.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';

export const LabUserUpdateOneSchema: z.ZodType<Prisma.LabUserUpdateArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), data: z.union([LabUserUpdateInputObjectSchema, LabUserUncheckedUpdateInputObjectSchema]), where: LabUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabUserUpdateArgs>;

export const LabUserUpdateOneZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), data: z.union([LabUserUpdateInputObjectSchema, LabUserUncheckedUpdateInputObjectSchema]), where: LabUserWhereUniqueInputObjectSchema }).strict();