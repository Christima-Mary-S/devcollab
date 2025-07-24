"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { OnChange, OnMount } from "@monaco-editor/react";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
import { io, Socket } from "socket.io-client";

interface CodeEditorProps {
  roomId: string;
  value: string;
  language: string;
  onChange: (v: string) => void;
}

export default function CodeEditor({
  roomId,
  value,
  language,
  onChange,
}: CodeEditorProps) {
  const editorRef = useRef<any>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // ensure API route initialized
    fetch("/api/socket").then(() => {
      socketRef.current = io();
      socketRef.current.emit("join-room", roomId);

      socketRef.current.on("code-change", (newCode: string) => {
        if (editorRef.current && newCode !== editorRef.current.getValue()) {
          onChange(newCode);
        }
      });
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId, onChange]);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange: OnChange = (newValue) => {
    if (newValue !== undefined) {
      onChange(newValue);
      socketRef.current?.emit("code-change", { roomId, code: newValue });
    }
  };

  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      value={value}
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
