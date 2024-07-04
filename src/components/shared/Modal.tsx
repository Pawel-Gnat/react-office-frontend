import { useModalContext } from "../../context/ModalContext";

import ClientForm from "../clients/ClientForm";
import DeleteClient from "../clients/DeleteClient";
import UserForm from "../users/UserForm";
import DeleteUser from "../users/DeleteUser";

import { Modal as ModalUI, Sheet, ModalClose, Typography } from "@mui/joy";

const Modal = () => {
  const { isOpen, modalContent, dispatch } = useModalContext();

  return (
    <ModalUI
      aria-labelledby="modal-title"
      open={isOpen}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          width: "100%",
        }}>
        <ModalClose
          color="neutral"
          variant="solid"
          sx={{ m: 1 }}
          onClick={() => dispatch({ type: "HIDE" })}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}>
          {modalContent === "add-user" && "Add new user"}
          {modalContent === "edit-user" && "Edit user"}
          {modalContent === "delete-user" && "Delete user"}
          {modalContent === "add-client" && "Add new client"}
          {modalContent === "edit-client" && "Edit client"}
          {modalContent === "delete-client" && "Delete client"}
        </Typography>
        {(modalContent === "add-user" || modalContent === "edit-user") && (
          <UserForm />
        )}
        {modalContent === "delete-user" && <DeleteUser />}
        {(modalContent === "add-client" || modalContent === "edit-client") && (
          <ClientForm />
        )}
        {modalContent === "delete-client" && <DeleteClient />}
      </Sheet>
    </ModalUI>
  );
};

export default Modal;
