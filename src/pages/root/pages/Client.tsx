import { useParams } from "react-router-dom";

const ClientPage = () => {
  const { clientId } = useParams();

  return (
    <div>
      <h1>Client {clientId}</h1>
    </div>
  );
};

export default ClientPage;
