import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (content: string) => void;
};

export default function Editor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p>Start writing your blog...</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] outline-none text-white px-2 py-1",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // sync external value (important for reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 focus-within:ring-2 focus-within:ring-indigo-500">

      {/* 🔥 TOOLBAR */}
      <div className="flex flex-wrap gap-2 mb-3">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bold")
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("italic")
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("heading", { level: 2 })
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bulletList")
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("orderedList")
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("blockquote")
              ? "bg-indigo-500 text-white"
              : "bg-slate-700 text-gray-300"
          }`}
        >
          ❝ Quote
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded text-sm bg-slate-700 text-gray-300"
        >
          ―
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded text-sm bg-slate-700 text-gray-300"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded text-sm bg-slate-700 text-gray-300"
        >
          Redo
        </button>
      </div>

      {/* ✨ EDITOR CONTENT */}
      <EditorContent editor={editor} />

    </div>
  );
}