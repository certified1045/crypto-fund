import * as z from "zod/v4";

export const addUserSchema = z.object({
  username: z.string().min(2),
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
