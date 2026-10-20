import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

type Severity = "success" | "info" | "warning" | "error";

interface Snack {
  title: string;
  message: string;
  severity: Severity;
}

interface SnackbarContextValues {
  showSnack: (title: string, message: string, severity: Severity) => void;
  showSuccess: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
}

const defaultSnackbarContextValues: SnackbarContextValues = {
  showSnack: (title: string, message: string, severity: Severity) => {
    console.warn("showSnack not implemented", title, message, severity);
  },
  showSuccess: (title: string, message: string) => {
    console.warn("showSuccess not implemented", title, message);
  },
  showInfo: (title: string, message: string) => {
    console.warn("showInfo not implemented", title, message);
  },
  showWarning: (title: string, message: string) => {
    console.warn("showWarning not implemented", title, message);
  },
  showError: (title: string, message: string) => {
    console.warn("showError not implemented", title, message);
  }
};

export const SnackbarContext = createContext<SnackbarContextValues>(
  defaultSnackbarContextValues
);

interface SnackbarContextProviderProps {
  children: JSX.Element;
}

const SnackbarContextProvider = (
  props: SnackbarContextProviderProps
) => {
  const [snack, setSnack] = useState<Snack | null>(null);

  const showSnack = (title: string, message: string, severity: Severity) => {
    setSnack({ title, message, severity });
  };

  const showSuccess = (title: string, message: string) => {
    showSnack(title, message, "success");
  };

  const showInfo = (title: string, message: string) => {
    showSnack(title, message, "info");
  };

  const showWarning = (title: string, message: string) => {
    showSnack(title, message, "warning");
  };

  const showError = (title: string, message: string) => {
    showSnack(title, message, "error");
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnack,
        showSuccess,
        showInfo,
        showWarning,
        showError
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snack !== null}
        autoHideDuration={6000}
        onClose={() => setSnack(null)}
      >
        <Alert
          onClose={() => setSnack(null)}
          severity={snack?.severity}
          sx={{ width: '100%' }}
        >
          <AlertTitle>{snack?.title}</AlertTitle>
          {snack?.message}
        </Alert>
      </Snackbar>
      {props.children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarContextProvider;

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbarContext must be used within a SnackbarContextProvider");
  }

  return context;
}