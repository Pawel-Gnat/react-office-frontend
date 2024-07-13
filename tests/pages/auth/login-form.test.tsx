import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import LoginForm from "@/components/auth/LoginForm";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Login form", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    render(<LoginForm />);
  });

  it("should render email input", () => {
    const emailInput = screen.getByLabelText("Your e-mail address", {
      selector: "input",
    });
    expect(emailInput).toBeInTheDocument();
  });

  it("should render password input", () => {
    const passwordInput = screen.getByLabelText("Your password", {
      selector: "input",
    });
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render login button", () => {
    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeInTheDocument();
  });

  it("should render error message when email input value doesnt match the pattern", async () => {
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Your e-mail address", {
      selector: "input",
    });
    const loginButton = screen.getByRole("button");

    await user.type(emailInput, "test@test");
    await user.click(loginButton);

    await waitFor(async () => {
      expect(
        await screen.findByText("Invalid email address")
      ).toBeInTheDocument();
    });
  });

  it("should render error message when password input value doesnt match the pattern", async () => {
    const user = userEvent.setup();

    const passwordInput = screen.getByLabelText("Your password", {
      selector: "input",
    });
    const loginButton = screen.getByRole("button");

    await user.type(passwordInput, " ");
    await user.click(loginButton);

    await waitFor(async () => {
      expect(
        await screen.findByText("Password must be at least 3 characters long")
      ).toBeInTheDocument();
    });
  });
});
