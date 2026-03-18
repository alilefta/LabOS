import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './objects/SelectedToothInclude.schema';
import { SelectedToothOrderByWithRelationInputObjectSchema as SelectedToothOrderByWithRelationInputObjectSchema } from './objects/SelectedToothOrderByWithRelationInput.schema';
import { SelectedToothWhereInputObjectSchema as SelectedToothWhereInputObjectSchema } from './objects/SelectedToothWhereInput.schema';
import { SelectedToothWhereUniqueInputObjectSchema as SelectedToothWhereUniqueInputObjectSchema } from './objects/SelectedToothWhereUniqueInput.schema';
import { SelectedToothScalarFieldEnumSchema } from './enums/SelectedToothScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SelectedToothFindManySelectSchema: z.ZodType<Prisma.SelectedToothSelect> = z.object({
    id: z.boolean().optional(),
    toothPosition: z.boolean().optional(),
    caseWorkItemId: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.SelectedToothSelect>;

export const SelectedToothFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    toothPosition: z.boolean().optional(),
    caseWorkItemId: z.boolean().optional(),
    caseWorkItem: z.boolean().optional(),
    labId: z.boolean().optional(),
    Lab: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const SelectedToothFindManySchema: z.ZodType<Prisma.SelectedToothFindManyArgs> = z.object({ select: SelectedToothFindManySelectSchema.optional(), include: z.lazy(() => SelectedToothIncludeObjectSchema.optional()), orderBy: z.union([SelectedToothOrderByWithRelationInputObjectSchema, SelectedToothOrderByWithRelationInputObjectSchema.array()]).optional(), where: SelectedToothWhereInputObjectSchema.optional(), cursor: SelectedToothWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SelectedToothScalarFieldEnumSchema, SelectedToothScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.SelectedToothFindManyArgs>;

export const SelectedToothFindManyZodSchema = z.object({ select: SelectedToothFindManySelectSchema.optional(), include: z.lazy(() => SelectedToothIncludeObjectSchema.optional()), orderBy: z.union([SelectedToothOrderByWithRelationInputObjectSchema, SelectedToothOrderByWithRelationInputObjectSchema.array()]).optional(), where: SelectedToothWhereInputObjectSchema.optional(), cursor: SelectedToothWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([SelectedToothScalarFieldEnumSchema, SelectedToothScalarFieldEnumSchema.array()]).optional() }).strict();