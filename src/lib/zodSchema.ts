import * as z from "zod";

export const addUserSchema = z.object({
  username: z.string().min(2),
  dealPrice: z.coerce.number({ error: "Required" }).positive(),
  securityDeposit: z.coerce.number({ error: "Required" }).positive(),
});

export const editUserSchema = z.object({
  username: z.string().min(2),
  progress: z
    .number()
    .max(100)
    .min(0, { message: "Required" })
    .array()
    .length(1, { message: "Required" }),
  dealPrice: z.number({ error: "Required" }).positive(),
  securityDeposit: z.number({ error: "Required" }).positive(),
});

export const addAddressSchema = z.object({
  details: z.string().min(10, { message: "Too short" }),
});

export const fileUploadSchema = z.object({
  img: z
    .array(z.custom<File>())
    .min(1, "Please add an image")
    .max(1, "You can only add a maximum of 1 image")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),
});

export const editAddressSchema = z.object({
  network: z.string({ error: "Required" }).min(1, { error: "Required" }),
  address: z.string({ error: "Required" }).min(1, { error: "Required" }),
});
