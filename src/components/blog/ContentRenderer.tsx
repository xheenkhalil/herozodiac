'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { useEffect } from 'react';

export function ContentRenderer({ content }: { content: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg border border-white/10 my-8 w-full',
        },
      }),
      Link.configure({ 
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-gold-400 hover:text-gold-300 underline',
        },
      }),
      // 2. Add YouTube Configuration
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-xl border border-white/10 shadow-lg my-8',
        },
      }),
    ],
    content: content,
    editable: false, 
    immediatelyRender: false, // Fix for SSR hydration
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-gold-400 prose-a:text-maroon-400 prose-strong:text-white text-slate-300 leading-relaxed prose-img:rounded-xl prose-iframe:w-full prose-iframe:aspect-video',
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}