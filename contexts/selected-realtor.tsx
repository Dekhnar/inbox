import { Realtor } from "@api";
import React, { FC, useMemo, useState } from "react";

const useSelectedRealtorContextProvider = () => {
  const [realtor, setRealtor] = useState<Realtor>({});
  return useMemo(() => ({ realtor, setRealtor }), [realtor]);
};

export const SelectedRealtorContext = React.createContext(
  {} as ReturnType<typeof useSelectedRealtorContextProvider>
);

export const SelectedRealtorProvider: FC = (props) => {
  return (
    <SelectedRealtorContext.Provider
      value={useSelectedRealtorContextProvider()}
      {...props}
    />
  );
};

export const useSelectedRealtor = () => {
  const context = React.useContext(SelectedRealtorContext);
  if (context === undefined) {
    throw new Error(
      `useSelectedRealtor must be used within a SelectedRealtorProvider`
    );
  }
  return context;
};

export const useUnreadMessageCount = () => {
  const { realtor } = useSelectedRealtor();
  return useMemo(() => {
    return realtor?.unread_messages ?? 0;
  }, [realtor?.unread_messages]);
};
