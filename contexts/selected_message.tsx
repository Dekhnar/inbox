import { Message } from "@api";
import React, { FC, useMemo, useState } from "react";

const useSelectedMessageContextProvider = () => {
  const [message, setMessage] = useState<Message>();
  return useMemo(() => ({ message, setMessage }), [message]);
};

export const SelectedMessageContext = React.createContext(
  {} as ReturnType<typeof useSelectedMessageContextProvider>
);

export const SelectedMessageContextProvider: FC = (props) => {
  return (
    <SelectedMessageContext.Provider
      value={useSelectedMessageContextProvider()}
      {...props}
    />
  );
};

export const useSelectedMessage = () => {
  const context = React.useContext(SelectedMessageContext);
  if (context === undefined) {
    throw new Error(
      `useSelectedMessage must be used within a SelectedMessageProvider`
    );
  }
  return context;
};