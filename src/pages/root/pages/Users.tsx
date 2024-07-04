import { useModalContext } from "../../../context/ModalContext";

import UsersTable from "../../../components/users/UsersTable";

import { Button } from "@mui/joy";

const UsersPage = () => {
  const { dispatch } = useModalContext();

  return (
    <div className="flex flex-col w-full">
      <UsersTable />

      <Button
        color="primary"
        onClick={() => dispatch({ type: "ADD_USER" })}
        size="md"
        variant="solid"
        sx={{ marginLeft: "auto", display: "block", marginTop: "16px" }}>
        Create new user
      </Button>
    </div>
  );
};

export default UsersPage;
