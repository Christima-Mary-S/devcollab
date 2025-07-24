"use client";

import { useState } from "react";

interface RunTerminalProps {
  code: string;
  language: string;
}

export default function RunTerminal({ code, language }: RunTerminalProps) {
  const [output, setOutput] = useState<string>("");

  const runCode = () => {
    if (language === "javascript") {
      try {
        // Capture console.log
        const logs: any[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.join(" "));
        };

        // Run code in a Function sandbox
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict";\n${code}`)();
        if (result !== undefined) logs.push(String(result));

        console.log = originalLog;
        setOutput(logs.join("\n") || "undefined");
      } catch (e: any) {
        setOutput(e.toString());
      }
    } else {
      setOutput(`Execution for ${language} is not yet supported.`);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex space-x-2">
        <button onClick={runCode} className="btn btn-primary text-sm">
          Run
        </button>
      </div>
      <div className="mt-2 bg-black text-green-300 font-mono p-4 rounded-lg overflow-auto">
        <pre>{output}</pre>
      </div>
    </div>
  );
}
