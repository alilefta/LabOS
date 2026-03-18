import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { LabUserSelectObjectSchema as LabUserSelectObjectSchema } from './objects/LabUserSelect.schema';
import { LabUserIncludeObjectSchema as LabUserIncludeObjectSchema } from './objects/LabUserInclude.schema';
import { LabUserWhereUniqueInputObjectSchema as LabUserWhereUniqueInputObjectSchema } from './objects/LabUserWhereUniqueInput.schema';

export const LabUserFindUniqueOrThrowSchema: z.ZodType<Prisma.LabUserFindUniqueOrThrowArgs> = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.LabUserFindUniqueOrThrowArgs>;

export const LabUserFindUniqueOrThrowZodSchema = z.object({ select: LabUserSelectObjectSchema.optional(), include: LabUserIncludeObjectSchema.optional(), where: LabUserWhereUniqueInputObjectSchema }).strict();