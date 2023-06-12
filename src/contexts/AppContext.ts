import React, { useContext } from "react";

interface AppContextProps {
  setTitle: (title: string) => void;
  requestLogin: () => void;
}

export const AppContext = React.createContext<Partial<AppContextProps>>({});

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
