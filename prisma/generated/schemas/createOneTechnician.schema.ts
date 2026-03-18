import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianCreateInputObjectSchema as TechnicianCreateInputObjectSchema } from './objects/TechnicianCreateInput.schema';
import { TechnicianUncheckedCreateInputObjectSchema as TechnicianUncheckedCreateInputObjectSchema } from './objects/TechnicianUncheckedCreateInput.schema';

export const TechnicianCreateOneSchema: z.ZodType<Prisma.TechnicianCreateArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), data: z.union([TechnicianCreateInputObjectSchema, TechnicianUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.TechnicianCreateArgs>;

export const TechnicianCreateOneZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), data: z.union([TechnicianCreateInputObjectSchema, TechnicianUncheckedCreateInputObjectSchema]) }).strict();