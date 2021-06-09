import { useUnreadMessageCount } from "@contexts/selected-realtor";
import { Box, Flex, Text } from "@theme-ui/components";
import React from "react";

const _InboxCounterIcon: React.FC = ({ children }) => {
  return <div></div>;
};

const InboxCounter: React.FC<React.SVGAttributes<{}>> = () => {
  const unreadCount = useUnreadMessageCount();
  return (
    <Box
      py="10"
      sx={{
        width: "61px",
        height: "31px",
        borderRadius: "8px",
        backgroundColor: "primary",
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Text>{unreadCount}</Text>
      </Flex>
    </Box>
  );
};

export default InboxCounter;
