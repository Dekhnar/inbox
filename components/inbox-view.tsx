/** @jsxImportSource theme-ui */

import InboxHeader from "@components/inbox-header";
import MessageDetail from "@components/message.detail";
import MessageList from "@components/message.list";
import useRealtorsQuery from "@data/use-realtors.query";
import { Flex, Text } from "theme-ui";
import { Message, Realtor } from "@api";
import { useEffect } from "react";
import { useSelectedMessage } from "@contexts/selected_message";
import { useSelectedRealtor } from "@contexts/selected-realtor";

export interface InboxViewProps {
  currentRealtor?: Realtor;
  currentMessage?: Message;
}

const InboxView: React.FC<InboxViewProps> = ({
  currentMessage,
  currentRealtor,
}) => {
  const {
    data: realtors,
    isLoading: loading,
    isError,
    error,
  } = useRealtorsQuery();
  const { realtor, setRealtor } = useSelectedRealtor();
  const { setMessage } = useSelectedMessage();
  const noRealtorSelectedYet = !realtor?.id;

  useEffect(() => {
    if (realtors?.length && noRealtorSelectedYet) {
      setRealtor(currentRealtor ?? realtors[0]);
      if (currentMessage) setMessage(currentMessage);
    }
  }, [realtors]);

  if (isError && error) return <Text>Error</Text>;
  if (loading || noRealtorSelectedYet) return <Text>Loading...</Text>;
  return (
    <>
      <InboxHeader />
      <Flex sx={{ pt: 60, height: "calc(100vh - 60px)" }}>
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

export default InboxView;
