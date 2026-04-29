import * as z from 'zod';

export const PaymentMethodSchema = z.enum(['CASH', 'SUPER_QI', 'BANK_TRANSFER', 'STRIPE', 'PADDLE', 'ZAIN_CASH', 'ASIA_HAWALA', 'OTHER'])

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;