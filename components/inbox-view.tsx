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
import { InfiniteData, useQueryClient } from "react-query";
import { PaginatedMessages } from "@data/use-messages.query";

export interface InboxViewProps {
  defaultRealtor?: Realtor;
  defaultMessage?: Message;
}

const RightPanel: React.FC = ({ children }) => {
  const { message: displayRightPanel } = useSelectedMessage();
  return (
    <div
      sx={{
        variant: "containers.page",
        flex: "2 1 auto",
      }}
    >
      {displayRightPanel && children}
    </div>
  );
};

const LeftPanel: React.FC = ({ children }) => {
  const { message: displayRightPanel } = useSelectedMessage();
  return (
    <div
      sx={{
        flex: "1 1 auto",
        minWidth: "375px",
        display: "block",
        "@media screen and (max-width: 991px)": {
          display: displayRightPanel ? "none" : "block",
        },
      }}
    >
      {children}
    </div>
  );
};

const InboxView: React.FC<InboxViewProps> = ({
  defaultMessage,
  defaultRealtor,
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
  const queryClient = useQueryClient();

  const router = useRouter();
  useEffect(() => {
    // Mangage default value
    setRealtor(defaultRealtor);
    setMessage(defaultMessage);
  }, []);

  useEffect(() => {
    // Mangage navigation back
    const path = router.asPath;
    const ids = path.split("/");
    ids.shift();

    const hasRealtorId = !!(ids.length && ids[0]);
    const hasMessageId = !!(ids.length > 1 && ids[1]);

    const realtorId = parseInt(ids[0]);
    if (hasRealtorId) {
      const newRealtor = queryClient
        .getQueryData<Realtor[]>(`RealtorsService.getRealtors`)
        ?.find((r) => r.id == realtorId);
      setRealtor(newRealtor);
    } else {
      setRealtor(undefined);
    }

    if (hasMessageId) {
      const newMessageId = parseInt(ids[1]);
      const data = queryClient.getQueryData<InfiniteData<PaginatedMessages>>([
        `MessagesService.getMessages`,
        realtorId,
      ]);
      let newMessage;
      data?.pages?.find((p) => {
        return p.data.find((m) => {
          if (m.id == newMessageId) {
            newMessage = m;
            return true;
          }
          return false;
        });
      });
      setMessage(newMessage);
    } else {
      setMessage(undefined);
    }
  }, [router]);

  useEffect(() => {
    if (realtors?.length && noRealtorSelectedYet)
      setRealtor(defaultRealtor ?? realtors![0]);
  }, [realtors?.length]);

  useEffect(() => {
    if (realtor?.id) {
      const currentPath = router.asPath;
      let path = `/${realtor.id.toString()}`;
      if (message?.id)
        path = currentPath.includes(realtor.id.toString())
          ? `${path}/${message.id.toString()}`
          : path;
      if (path != currentPath) {
        if (currentPath == "/") {
          router.replace(path);
        } else if (currentPath.includes(realtor.id.toString())) {
          // We select the same realtor but a new message
          router.push(path, undefined, { shallow: true });
        } else {
          // We select a new realtor
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
      <Flex sx={{ pt: 60, height: "100vh" }}>
        <LeftPanel>
          <MessageList />
        </LeftPanel>
        <RightPanel>
          <MessageDetail />
        </RightPanel>
      </Flex>
    </>
  );
};

export default InboxView;
