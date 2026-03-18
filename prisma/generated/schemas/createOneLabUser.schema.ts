import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserCreateInputObjectSchema as LabUserCreateInputObjectSchema } from './objects/LabUserCreateInput.schema';
import { LabUserUncheckedCreateInputObjectSchema as LabUserUncheckedCreateInputObjectSchema } from './objects/LabUserUncheckedCreateInput.schema';

export const LabUserCreateOneSchema: z.ZodType<Prisma.LabUserCreateArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), data: z.union([LabUserCreateInputObjectSchema, LabUserUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.LabUserCreateArgs>;

export const LabUserCreateOneZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), data: z.union([LabUserCreateInputObjectSchema, LabUserUncheckedCreateInputObjectSchema]) }).strict();