import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SalesRepresentativeSelectObjectSchema as SalesRepresentativeSelectObjectSchema } from './SalesRepresentativeSelect.schema';
import { SalesRepresentativeIncludeObjectSchema as SalesRepresentativeIncludeObjectSchema } from './SalesRepresentativeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SalesRepresentativeSelectObjectSchema).optional(),
  include: z.lazy(() => SalesRepresentativeIncludeObjectSchema).optional()
}).strict();
export const SalesRepresentativeArgsObjectSchema = makeSchema();
export const SalesRepresentativeArgsObjectZodSchema = makeSchema();
