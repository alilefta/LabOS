import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const SalesRepresentativeWhereUniqueInputObjectSchema: z.ZodType<Prisma.SalesRepresentativeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SalesRepresentativeWhereUniqueInput>;
export const SalesRepresentativeWhereUniqueInputObjectZodSchema = makeSchema();
