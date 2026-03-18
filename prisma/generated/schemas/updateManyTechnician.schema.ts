import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { TechnicianUpdateManyMutationInputObjectSchema as TechnicianUpdateManyMutationInputObjectSchema } from './objects/TechnicianUpdateManyMutationInput.schema';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './objects/TechnicianWhereInput.schema';

export const TechnicianUpdateManySchema: z.ZodType<Prisma.TechnicianUpdateManyArgs> = z.object({ data: TechnicianUpdateManyMutationInputObjectSchema, where: TechnicianWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.TechnicianUpdateManyArgs>;

export const TechnicianUpdateManyZodSchema = z.object({ data: TechnicianUpdateManyMutationInputObjectSchema, where: TechnicianWhereInputObjectSchema.optional() }).strict();