import { SelectedRealtorProvider } from "@contexts/selected-realtor";
import React from "react";

const Inbox: React.FC = ({ children }) => {
  return <SelectedRealtorProvider>{children}</SelectedRealtorProvider>;
};

export default Inbox;
