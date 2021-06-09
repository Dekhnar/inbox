import { Message } from "@api";
import React, { FC, useMemo, useState } from "react";

const useSelectedMessageContextProvider = () => {
  const [realtor, setMessage] = useState<Message>();
  return useMemo(() => ({ realtor, setMessage }), [realtor]);
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
