import { SelectedRealtorContextProvider } from "@contexts/selected-realtor";
import { SelectedMessageContextProvider } from "@contexts/selected_message";
import React from "react";

const Inbox: React.FC = ({ children }) => {
  return (
    <SelectedRealtorContextProvider>
      <SelectedMessageContextProvider>
        {children}
      </SelectedMessageContextProvider>
    </SelectedRealtorContextProvider>
  );
};

export default Inbox;
