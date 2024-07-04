// import axios from "axios";
// import { useEffect, useState } from "react";

// import { Client } from "../types";

// const useClients = () => {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const getClients = async () => {
//     setIsLoading(true);

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/clients`
//       );

//       if ((response.status = 200)) {
//         console.log(response.data);
//         setClients(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getClients();
//   }, []);

//   return {
//     clients,
//     setClients,
//     isLoading,
//     getClients,
//   };
// };

// export default useClients;
