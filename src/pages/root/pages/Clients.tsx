import { useModalContext } from "../../../context/ModalContext";

import ClientsTable from "../../../components/clients/ClientsTable";

import { Button } from "@mui/joy";

const ClientsPage = () => {
  const { dispatch } = useModalContext();

  return (
    <div className="flex flex-col w-full">
      <ClientsTable />

      <Button
        color="primary"
        onClick={() => dispatch({ type: "ADD_CLIENT" })}
        size="md"
        variant="solid"
        sx={{ marginLeft: "auto", display: "block", marginTop: "16px" }}>
        Add new client
      </Button>
    </div>
  );
};

export default ClientsPage;
