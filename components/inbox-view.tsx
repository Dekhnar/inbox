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
import { useRouter } from "next/router";

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
  const { message, setMessage } = useSelectedMessage();
  const noRealtorSelectedYet = !realtor?.id;

  const router = useRouter();
  useEffect(() => {
    setRealtor(currentRealtor);
    setMessage(currentMessage);
  }, [router]);

  useEffect(() => {
    if (realtors?.length && noRealtorSelectedYet)
      setRealtor(currentRealtor ?? realtors![0]);
  }, [realtors?.length]);

  useEffect(() => {
    if (realtor?.id) {
      const currentPath = router.asPath;
      let path = `/${realtor.id.toString()}`;
      if (message?.id) path = currentPath.includes(realtor.id.toString()) ? `${path}/${message.id.toString()}` : path;
      if (path != currentPath) {
        if (currentPath == "/") {
          router.replace(path);
        } else {
          router.push(path);
        }
      }
    }
  }, [realtor, message]);

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
