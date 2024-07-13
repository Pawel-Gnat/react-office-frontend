import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ModalProvider, useModalContext } from "@/context/ModalContext";

import Modal from "@/components/shared/Modal";
import userEvent from "@testing-library/user-event";
import { UsersProvider, useUsersContext } from "@/context/UsersContext";

vi.mock("@/context/ModalContext", async () => {
  const actual = await vi.importActual("@/context/ModalContext");
  return {
    ...actual,
    useModalContext: vi.fn(),
  };
});

vi.mock("@/context/UsersContext", async () => {
  const actual = await vi.importActual("@/context/UsersContext");
  return {
    ...actual,
    useUsersContext: vi.fn(),
  };
});

const mockDispatch = vi.fn();

describe("Modal component", () => {
  const renderModal = (
    modalContent:
      | "add-client"
      | "edit-client"
      | "delete-client"
      | "add-user"
      | "edit-user"
      | "delete-user"
      | null,
    userId: string,
    clientId: string
  ) => {
    vi.mocked(useModalContext).mockReturnValue({
      isOpen: true,
      isLoading: false,
      dispatch: mockDispatch,
      modalContent,
      clientId,
      userId,
    });

    vi.mocked(useUsersContext).mockReturnValue({
      users: [
        {
          _id: "123",
          name: "John Doe",
          surname: "Doe",
          email: "john@example.com",
        },
      ],
      setUsers: vi.fn(),
      isLoading: false,
      setIsLoading: vi.fn(),
    });

    render(
      <UsersProvider>
        <ModalProvider>
          <Modal />
        </ModalProvider>
      </UsersProvider>
    );
  };

  it("should render add user form", () => {
    renderModal("add-user", "", "");

    const newUserTitle = screen.getByText("Add new user");
    const userNameInput = screen.getByLabelText("User name", {
      selector: "input",
    });
    const userSurnameInput = screen.getByLabelText("User surname", {
      selector: "input",
    });
    const userEmail = screen.getByLabelText("User email", {
      selector: "input",
    });
    const userPassword = screen.getByLabelText("User password", {
      selector: "input",
    });
    const createButton = screen.getByRole("button", { name: "Create" });

    expect(newUserTitle).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(userSurnameInput).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
    expect(userPassword).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  it("should render add user form error messages", async () => {
    const user = userEvent.setup();
    renderModal("add-user", "", "");

    const userNameInput = screen.getByLabelText("User name", {
      selector: "input",
    });
    const userSurnameInput = screen.getByLabelText("User surname", {
      selector: "input",
    });
    const userEmail = screen.getByLabelText("User email", {
      selector: "input",
    });
    const userPassword = screen.getByLabelText("User password", {
      selector: "input",
    });
    const createButton = screen.getByRole("button", { name: "Create" });

    await user.type(userNameInput, " ");
    await user.type(userSurnameInput, " ");
    await user.type(userEmail, " ");
    await user.type(userPassword, " ");
    await user.click(createButton);

    expect(
      await screen.findByText("Name must be at least 3 characters long")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Surname must be at least 3 characters long")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid email address")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 3 characters long")
    ).toBeInTheDocument();
  });

  it("should render edit user form", () => {
    renderModal("edit-user", "123", "");

    const newUserTitle = screen.getByText("Edit user");
    const editButton = screen.getByRole("button", { name: "Edit" });

    // screen.debug();

    expect(newUserTitle).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });
});
