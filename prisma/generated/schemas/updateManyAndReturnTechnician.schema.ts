import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './objects/TechnicianSelect.schema';
import { TechnicianUpdateManyMutationInputObjectSchema as TechnicianUpdateManyMutationInputObjectSchema } from './objects/TechnicianUpdateManyMutationInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './objects/TechnicianWhereInput.schema';

export const TechnicianUpdateManyAndReturnSchema: z.ZodType<Prisma.TechnicianUpdateManyAndReturnArgs> = z.object({ select: TechnicianSelectObjectSchema.optional(), data: TechnicianUpdateManyMutationInputObjectSchema, where: TechnicianWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianUpdateManyAndReturnArgs>;

export const TechnicianUpdateManyAndReturnZodSchema = z.object({ select: TechnicianSelectObjectSchema.optional(), data: TechnicianUpdateManyMutationInputObjectSchema, where: TechnicianWhereInputObjectSchema.optional() }).strict();