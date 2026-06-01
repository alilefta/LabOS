import * as z from 'zod';

export const WeekdaySchema = z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])

export type Weekday = z.infer<typeof WeekdaySchema>;