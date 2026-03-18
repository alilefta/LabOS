import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';

export const TechnicianDeleteOneSchema: z.ZodType<Prisma.TechnicianDeleteArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TechnicianDeleteArgs>;

export const TechnicianDeleteOneZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema }).strict();