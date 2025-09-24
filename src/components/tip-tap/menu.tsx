import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  Heading1Icon,
  ItalicIcon,
  RedoIcon,
  UndoIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Toggle } from "../ui/toggle";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const Options1 = [
    {
      icon: <UndoIcon size={12} />,
      onClick: () => editor.chain().focus().undo().run(),
      pressed: editor.isActive("undo"),
    },
    {
      icon: <RedoIcon size={12} />,
      onClick: () => editor.chain().focus().redo().run(),
      pressed: editor.isActive("redo"),
    },
  ];
  const Options2 = [
    {
      icon: <BoldIcon size={12} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <ItalicIcon size={12} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
  ];

  return (
    <div className="mb-1 bg-accent flex gap-1 py-0 items-center">
      {Options1.map((option, i) => (
        <Toggle
          key={i}
          pressed={option.pressed}
          onPressedChange={option.onClick}
          size="sm"
          className="data-[state=on]:bg-muted-foreground/30 hover:bg-muted-foreground/10"
        >
          {option.icon}
        </Toggle>
      ))}
      <Separator orientation="vertical" className="w-0.5 mx-0.5 h-8" />
      <Separator orientation="vertical" className="w-0.5 mx-0.5 h-8" />
      {Options2.map((option, i) => (
        <Toggle
          key={i}
          pressed={option.pressed}
          onPressedChange={option.onClick}
          size="sm"
          className="data-[state=on]:bg-muted-foreground/30 hover:bg-muted-foreground/10"
        >
          {option.icon}
        </Toggle>
      ))}
      <Separator orientation="vertical" className="w-0.5 mx-0.5 h-8" />
      <Separator orientation="vertical" className="w-0.5 mx-0.5 h-8" />
      <Toggle
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        size="sm"
        className="data-[state=on]:bg-muted-foreground/30 hover:bg-muted-foreground/10"
      >
        <Heading1Icon size={12} />
      </Toggle>
    </div>
  );

  //   return (
  //     <div className="control-group">
  //       <div className="button-group">
  //         {/* <Button
  //           onClick={() => () => editor.chain().focus().setParagraph().run()}
  //           className={editor.isActive("paragraph")}
  //         >
  //           Paragraph
  //         </Button> */}
  //         <Button
  //           onClick={() => () => editor.chain().focus().setTextAlign("left").run()}
  //           className={editor.isActive({ textAlign: "left" })}
  //         >
  //           Left
  //         </Button>
  //         <Button
  //           onClick={() => () => editor.chain().focus().setTextAlign("center").run()}
  //           className={
  //             editor.isActive({ textAlign: "center" })
  //           }
  //         >
  //           Center
  //         </Button>
  //         <Button
  //           onClick={() => () => editor.chain().focus().setTextAlign("right").run()}
  //           className={editor.isActive({ textAlign: "right" })}
  //         >
  //           Right
  //         </Button>
  //         <Button
  //           onClick={() => () => editor.chain().focus().setTextAlign("justify").run()}
  //           className={
  //             editor.isActive({ textAlign: "justify" })
  //           }
  //         >
  //           Justify
  //         </Button>
  //       </div>
  //     </div>
  //   );
};
