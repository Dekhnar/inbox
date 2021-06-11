/** @jsxImportSource theme-ui */

import { Flex, Box } from "theme-ui";
import InboxNavbarIcon from "@components/inbox-navbar-icon";
import InboxCounter from "@components/inbox-counter";
import InboxRealtorDropdown from "@components/inbox-realtor-dropdown";
import router from "next/router";

const InboxHeader = () => {
  const handleClick = () => {
    const parts = router.asPath.split("/");
    parts.pop();
    router.push(parts.join("/"));
  };
  return (
    <header>
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
        <InboxNavbarIcon
          width={133}
          height={37}
          sx={{ fill: "secondary" }}
          onClick={handleClick}
        />
        <Flex>
          <InboxCounter />
          <Box marginRight="16px" />
          <InboxRealtorDropdown />
        </Flex>
      </nav>
    </header>
  );
};

export default InboxHeader;
