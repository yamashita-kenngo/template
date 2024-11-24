import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HelloWorld } from "../components/HelloWorld";

describe("HelloWorld", () => {
	it("renders Helloworld text", () => {
		render(<HelloWorld />);
		expect(screen.getByText("Hello World !")).toBeInTheDocument();
	});

	it("has the correct styling", () => {
		render(<HelloWorld />);
		const heading = screen.getByText("Hello World !");
		expect(heading).toHaveClass("text-2xl", "font-bold", "text-center");
	});
});
