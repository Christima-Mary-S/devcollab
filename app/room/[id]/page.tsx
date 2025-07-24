"use client";

import CodeEditor from "@/components/ui/CodeEditor";
import RunTerminal from "@/components/ui/RunTerminal";
import { useState } from "react";

export default function RoomPage() {
  // … session guard …

  const [code, setCode] = useState<string>("console.log('Hello World');");
  const [language, setLanguage] = useState<"javascript" | "python">(
    "javascript"
  );

  return (
    <div className="flex flex-col h-full">
      {/* Language selector */}
      <div className="flex items-center space-x-2 mb-2">
        <label htmlFor="language" className="text-sm font-medium">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="input w-auto"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* Editor */}
      <div className="editor-container border rounded-lg overflow-hidden h-[60vh]">
        <CodeEditor value={code} language={language} onChange={setCode} />
      </div>

      {/* Run Terminal */}
      <RunTerminal code={code} language={language} />
    </div>
  );
}
