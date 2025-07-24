"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { OnChange, OnMount } from "@monaco-editor/react";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface CodeEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({
  value,
  language,
  onChange,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange: OnChange = (newValue) => {
    if (newValue !== undefined) onChange(newValue);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={value}
      onMount={handleMount}
      onChange={handleChange}
      theme="vs-dark"
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
      }}
    />
  );
}
