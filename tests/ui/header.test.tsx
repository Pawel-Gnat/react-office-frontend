import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Header from "@/components/shared/Header";

describe("Header component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it("should render home link", () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toBeInTheDocument();
  });

  it("should render clients link", () => {
    const clientsLink = screen.getByRole("link", { name: "Clients" });
    expect(clientsLink).toBeInTheDocument();
  });

  it("should render users link", () => {
    const usersLink = screen.getByRole("link", { name: "Users" });
    expect(usersLink).toBeInTheDocument();
  });

  it("should render logout button", () => {
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
  });
});
