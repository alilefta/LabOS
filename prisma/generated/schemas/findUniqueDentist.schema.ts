import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './objects/DentistSelect.schema';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './objects/DentistInclude.schema';
import { DentistWhereUniqueInputObjectSchema as DentistWhereUniqueInputObjectSchema } from './objects/DentistWhereUniqueInput.schema';

export const DentistFindUniqueSchema: z.ZodType<Prisma.DentistFindUniqueArgs> = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), where: DentistWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.DentistFindUniqueArgs>;

export const DentistFindUniqueZodSchema = z.object({ select: DentistSelectObjectSchema.optional(), include: DentistIncludeObjectSchema.optional(), where: DentistWhereUniqueInputObjectSchema }).strict();