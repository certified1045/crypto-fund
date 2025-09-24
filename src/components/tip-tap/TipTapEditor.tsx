"use client";

import { Control } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import { Placeholder } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { MenuBar } from "./menu";

export function TiptapEditor({ control }: { control: Control<any> }) {
  return (
    <FormField
      name="details"
      //   defaultValue=""
      control={control}
      render={({ field: { value, onChange } }) => {
        const editor = useEditor({
          extensions: [
            StarterKit,
            Placeholder.configure({
              placeholder: "Add details to show",
            }),
          ],
          immediatelyRender: false,
          autofocus: true,
          editorProps: {
            attributes: {
              class: "min-h-40 py-2 px-3",
            },
          },
          injectCSS: false,
          content: value,
          onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
          },
        });

        // Keep editor in sync if defaultValue changes
        useEffect(() => {
          if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
          }
        }, [value, editor]);

        if (!editor) return null;

        return (
          <FormItem>
            <FormLabel>Details</FormLabel>
            <FormControl className="border rounded">
              <div className="">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
