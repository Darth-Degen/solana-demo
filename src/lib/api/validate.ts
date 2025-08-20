import { z } from "zod";

export const ProductCreateSchema = z.object({
  name: z.string().min(2),
  price: z.number().nonnegative(),
  description: z.string().min(2),
});
export type ProductCreateInput = z.infer<typeof ProductCreateSchema>;

export const ProductUpdateSchema = ProductCreateSchema.partial();
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;
