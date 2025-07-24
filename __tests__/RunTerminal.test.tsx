/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RunTerminal from "../components/ui/RunTerminal";

describe("RunTerminal", () => {
  it("runs JS code and displays console.log output", async () => {
    render(<RunTerminal code="console.log('foo');" language="javascript" />);

    // Click the Run button (userEvent auto-wraps in act())
    await userEvent.click(screen.getByRole("button", { name: /run/i }));

    // Now assert that the output pane contains "foo"
    expect(screen.getByText("foo")).toBeInTheDocument();
  });
});
