import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './objects/SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './objects/SalesRepresentativeInclude.schema';
import { SalesRepresentativeCreateInputObjectSchema as SalesRepresentativeCreateInputObjectSchema } from './objects/SalesRepresentativeCreateInput.schema';
import { SalesRepresentativeUncheckedCreateInputObjectSchema as SalesRepresentativeUncheckedCreateInputObjectSchema } from './objects/SalesRepresentativeUncheckedCreateInput.schema';

export const SalesRepresentativeCreateOneSchema: z.ZodType<Prisma.SalesRepresentativeCreateArgs> = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), data: z.union([SalesRepresentativeCreateInputObjectSchema, SalesRepresentativeUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SalesRepresentativeCreateArgs>;

export const SalesRepresentativeCreateOneZodSchema = z.object({ select: SalesRepresentativeSelectObjectSchema.optional(), include: SalesRepresentativeIncludeObjectSchema.optional(), data: z.union([SalesRepresentativeCreateInputObjectSchema, SalesRepresentativeUncheckedCreateInputObjectSchema]) }).strict();