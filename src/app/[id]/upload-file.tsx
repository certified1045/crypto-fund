"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { uploadFiles } from "@/lib/uploadthing";
// import { UploadThingError } from "uploadthing/server";
import z from "zod";
import { fileUploadSchema } from "@/lib/zodSchema";
import { CloudUpload, LoaderIcon, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadProps,
} from "@/components/ui/file-upload";

export default function UploadFile({
  userId,
  setOpenDialog,
}: {
  userId: string;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: { img: [] },
  });

  const onUpload: NonNullable<FileUploadProps["onUpload"]> = useCallback(
    async (files, { onProgress }) => {
      try {
        const formInput = new FormData();
        formInput.append("file", files[0]);
        formInput.append("upload_preset", "u16vszak");
        setIsUploading(true);
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload",
          {
            method: "POST",
            body: formInput,
          }
        );
        const response = await res.json();
        await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userId,
            imgURL: response?.secure_url,
          }),
        });
        toast.success("File uploaded successfully");
      } catch (error) {
        console.log({ error });
        // toast.error("Could not upload file")
        toast.error("An unknown error occurred", {
          description: "Please try again",
        });
      } finally {
        setIsUploading(false);
        setOpenDialog(false);
      }
    },
    []
  );

  //   const onFileReject = useCallback((file: File, message: string) => {
  //     toast(message, {
  //       description: `"${
  //         file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
  //       }" has been rejected`,
  //     });
  //   }, []);

  const handleSubmit = (body: z.infer<typeof fileUploadSchema>) => {
    console.log({ body });
  };

  const all = form.watch();

  console.log({ all });

  console.log({ erroes: form.formState.errors });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 max-w-[428px]"
      >
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Upload your evidence of payment</FormLabel>
              <FormControl>
                <FileUpload
                  onAccept={(files) => setFiles(files)}
                  onUpload={onUpload}
                  disabled={isUploading}
                  value={field.value}
                  onValueChange={field.onChange}
                  accept="image/*"
                  maxFiles={1}
                  maxSize={5 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    field.value = [];
                    form.setError("img", {
                      message,
                    });
                  }}
                  multiple={true}
                >
                  <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                    <CloudUpload className="size-4" />
                    Drag and drop or
                    <FileUploadTrigger asChild>
                      <Button variant="link" size="sm" className="p-0">
                        choose files
                      </Button>
                    </FileUploadTrigger>
                    to upload
                  </FileUploadDropzone>
                  <FileUploadList>
                    {field.value.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <span className="gap-2 flex">
                          <FileUploadItemPreview />
                          <FileUploadItemMetadata />
                        </span>
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            type="button"
                          >
                            <XIcon />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormDescription>
                The file should not be above 5MB
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isUploading && (
          <div className="space-y-1">
            <LoaderIcon className="animate-spin mx-auto inline-block" />
            <p className="text-center">
              The Image is been uploaded <br /> Please wait...
            </p>
          </div>
        )}
        {/* <Button
          disabled={form.formState.isSubmitted || isUploading}
          className="w-full mt-2"
        >
          {form.formState.isSubmitted && (
            <LoaderIcon className="animate-spin" />
          )}
          Submit
        </Button> */}
      </form>
    </Form>
  );
}
