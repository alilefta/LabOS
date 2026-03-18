import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './objects/ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './objects/ClinicInclude.schema';
import { ClinicWhereUniqueInputObjectSchema as ClinicWhereUniqueInputObjectSchema } from './objects/ClinicWhereUniqueInput.schema';

export const ClinicFindUniqueSchema: z.ZodType<Prisma.ClinicFindUniqueArgs> = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ClinicFindUniqueArgs>;

export const ClinicFindUniqueZodSchema = z.object({ select: ClinicSelectObjectSchema.optional(), include: ClinicIncludeObjectSchema.optional(), where: ClinicWhereUniqueInputObjectSchema }).strict();