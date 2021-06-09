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
        <div sx={{ flex: "1 1 auto" }}>
          <MessageList />
        </div>
        <div
          sx={{
            flex: "2 1 auto",
            display: "block",
            "@media screen and (max-width: 749px)": {
              display: "none",
            },
          }}
        >
          <MessageDetail />
        </div>
      </Flex>
    </Inbox>
  );
}
