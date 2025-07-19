"use client";

import CodeEditor from "@/components/ui/Editor";
import { useState } from "react";

export default function RoomPage() {
  // ...session guard logic...

  const [code, setCode] = useState<string>("// Start coding...");

  return (
    <div className="editor-container">
      <CodeEditor
        value={code}
        language="javascript"
        onChange={(val) => setCode(val)}
      />
    </div>
  );
}
