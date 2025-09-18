import * as z from "zod/v4";

export const addUserSchema = z.object({
  username: z.string().min(2),
});

export const addAddressSchema = z.object({
  address: z.string().min(2),
});
