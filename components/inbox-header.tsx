/** @jsxImportSource theme-ui */

import { Flex, Box } from "theme-ui";
import InboxNavbarIcon from "@components/inbox-navbar-icon";
import InboxCounter from "@components/inbox-counter";
import InboxRealtorDropdown from "@components/inbox-realtor-dropdown";

const InboxHeader = () => {
  return (
    <nav
      sx={{
        variant: "containers.navbar",
        position: "fixed",
        zIndex: "999",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <InboxNavbarIcon width={133} height={37} sx={{ fill: "secondary" }} />
      <Flex>
        <InboxCounter />
        <Box marginRight="16px" />
        <InboxRealtorDropdown />
      </Flex>
    </nav>
  );
};

export default InboxHeader;
