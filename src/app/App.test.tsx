import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders without errors", async () => {
    render(<App />);
    expect(await screen.findByText("SpotifyForged")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /Welcome to SpotifyForged/i }),
    ).toBeInTheDocument();
  });
});
