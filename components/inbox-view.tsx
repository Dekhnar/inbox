/** @jsxImportSource theme-ui */

import { Flex, Text } from "theme-ui";
import InboxHeader from "@components/inbox-header";
import MessageList from "@components/message.list";
import MessageDetail from "@components/message.detail";
import { useSelectedRealtor } from "@contexts/selected-realtor";
import useRealtorsQuery from "@data/use-realtors.query";
import { useEffect } from "react";
import { useSelectedMessage } from "@contexts/selected_message";
import { useRouter } from "next/dist/client/router";

const RightPanel: React.FC = ({ children }) => {
  const { message: displayRightPanel } = useSelectedMessage();
  return (
    <div
      sx={{
        flex: "2 1 auto",
        display: displayRightPanel ? "block" : "none",
        "@media screen and (max-width: 749px)": {
          display: "none",
        },
      }}
    >
      {displayRightPanel && children}
    </div>
  );
};

const InboxView: React.FC = () => {
   const { query } = useRouter();
   const { data, isLoading: loading, isError, error } = useRealtorsQuery();
   const { realtor, setRealtor } = useSelectedRealtor();
   const noRealtorSelectedYet = !realtor?.id;
   useEffect(() => {
     if (data && noRealtorSelectedYet) setRealtor(data[0]);
   }, [data]);
   if (isError && error) return <Text>Error</Text>;
   if (loading || noRealtorSelectedYet) return <Text>Loading...</Text>;
   return (
     <>
       <InboxHeader />
       <Flex sx={{ pt: 60 }}>
         <div sx={{ flex: "1 1 auto" }}>
           <MessageList />
         </div>
         <RightPanel>
           <MessageDetail />
         </RightPanel>
       </Flex>
     </>
   );
};

export default InboxView;