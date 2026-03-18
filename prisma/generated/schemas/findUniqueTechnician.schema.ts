import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './objects/TechnicianInclude.schema';
import { TechnicianWhereUniqueInputObjectSchema as TechnicianWhereUniqueInputObjectSchema } from './objects/TechnicianWhereUniqueInput.schema';

export const TechnicianFindUniqueSchema: z.ZodType<Prisma.TechnicianFindUniqueArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.TechnicianFindUniqueArgs>;

export const TechnicianFindUniqueZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), include: TechnicianIncludeObjectSchema.optional(), where: TechnicianWhereUniqueInputObjectSchema }).strict();