import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';

export const LabUserFindUniqueSchema: z.ZodType<Prisma.LabUserFindUniqueArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabUserFindUniqueArgs>;

export const LabUserFindUniqueZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema }).strict();