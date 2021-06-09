import { useUnreadMessageCount } from "@contexts/selected-realtor";
import { Box, Flex, Text } from "@theme-ui/components";
import React from "react";

const InboxCounterIcon: React.FC = () => {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.96738 7.08447L18.9348 1.48889V11.7924H1V1.48889L9.96738 7.08447Z"
        stroke="white"
      />
      <path d="M0.634766 1.01099H19.3889" stroke="white" />
    </svg>
  );
};

const InboxCounter: React.FC<React.SVGAttributes<{}>> = () => {
  const unreadCount = useUnreadMessageCount();
  const hasUnread = unreadCount > 0;
  return (
    <Box
      variant={
        hasUnread ? "containers.counter.enabled" : "containers.counter.disabled"
      }
    >
      <Flex sx={{ alignItems: "center", justifyContent:"space-around", height: "100%" }}>
        <InboxCounterIcon/>
        <Text color="white">{unreadCount}</Text>
      </Flex>
    </Box>
  );
};

export default InboxCounter;
