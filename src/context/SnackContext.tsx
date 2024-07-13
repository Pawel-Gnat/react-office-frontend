import { createContext, ReactNode, useContext, useState } from "react";

import Snackbar from "@mui/joy/Snackbar";

interface SnackContextProps {
  setSnack: (message: string, color: "success" | "warning" | "danger") => void;
}

const SnackContext = createContext<SnackContextProps>({
  setSnack: () => {},
});

export const SnackProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<"success" | "warning" | "danger">(
    "success"
  );

  const setSnack = (
    message: string,
    color: "success" | "warning" | "danger"
  ) => {
    setOpen(true);
    setMessage(message);
    setColor(color);
  };

  return (
    <SnackContext.Provider value={{ setSnack }}>
      {children}
      <Snackbar
        autoHideDuration={2000}
        open={open}
        variant="outlined"
        color={color}
        onClose={() => {
          setOpen(false);
        }}>
        {message}
      </Snackbar>
    </SnackContext.Provider>
  );
};

export const useSnackContext = () => useContext(SnackContext);
