import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("@monaco-editor/react", () => {
  return {
    __esModule: true,
    default: function MockMonacoEditor({
      defaultValue,
      onChange,
    }: {
      defaultValue?: string;
      onChange?: (value: string) => void;
    }) {
      return (
        <textarea
          role="textbox"
          defaultValue={defaultValue}
          onChange={(e) => onChange?.((e.target as HTMLTextAreaElement).value)}
        />
      );
    },
  };
});

import CodeEditor from "@/components/ui/Editor";

describe("CodeEditor (with inline Monaco mock)", () => {
  it("renders a textbox and responds to input", async () => {
    const handleChange = jest.fn();
    render(
      <CodeEditor
        value="console.log('hi');"
        language="javascript"
        onChange={handleChange}
      />
    );

    // Verify the mocked textarea is in the document
    const textbox = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textbox).toBeInTheDocument();
    expect(textbox.value).toBe("console.log('hi');");

    // Simulate user typing to trigger onChange
    await userEvent.clear(textbox);
    await userEvent.type(textbox, "alert('test');");
    expect(handleChange).toHaveBeenLastCalledWith("alert('test');");
  });
});
