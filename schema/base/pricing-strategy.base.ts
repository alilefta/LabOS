import z from "zod";

export const PricingStrategySchema = z.enum(["BULK", "PERTOOTH", "CUSTOM"]);
