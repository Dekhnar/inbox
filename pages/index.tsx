/** @jsxImportSource theme-ui */

import Inbox from "@components/inbox";
import { Flex, Box, Card } from "theme-ui";
import InboxHeader from "@components/inbox-header";
import MessageList from "@components/message.list";

function MessageDetail() {
  return (
    <Box
      variant="containers.page"
      paddingLeft="28px"
      paddingRight="28px"
      paddingTop="36px"
      paddingBottom="33px"
      sx={{ height: "100%" }}
    >
      <Flex sx={{ flexDirection: "column" }}>
        <Card
          sx={{
            variant: "containers.card",
            minHeight: "122px",
            marginBottom: "22px",
          }}
        ></Card>
        <Card
          sx={{
            variant: "containers.card",
            minHeight: "637px",
            flexGrow: 1,
          }}
        ></Card>
        <Box sx={{ height: 1 }} />
      </Flex>
    </Box>
  );
}

export default function Home() {
  return (
    <Inbox>
      <InboxHeader />
      <Flex sx={{ pt: 60 }}>
        <MessageList />
        <Box sx={{ flex: "1 1 auto", display: ["none", "block", "block"] }}>
          <MessageDetail />
        </Box>
      </Flex>
    </Inbox>
  );
}
