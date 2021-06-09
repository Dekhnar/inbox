/** @jsxImportSource theme-ui */

import Inbox from "@components/inbox";
import { Flex, Box } from "theme-ui";
import InboxHeader from "@components/inbox-header";
import MessageList from "@components/message.list";
import MessageDetail from "@components/message.detail";

export default function Home() {
  return (
    <Inbox>
      <InboxHeader />
      <Flex sx={{ pt: 60 }}>
        <MessageList/>
        <Box sx={{ flex: "1 1 auto", display: ["none", "block", "block"] }}>
          <MessageDetail />
        </Box>
      </Flex>
    </Inbox>
  );
}
