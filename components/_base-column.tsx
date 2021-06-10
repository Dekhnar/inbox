import React from "react";
/** @jsxImportSource theme-ui */

import { Flex, FlexProps } from "theme-ui";

const Column: React.FC<FlexProps> = (props) => (
  <Flex {...props} sx={{ flexDirection: "column" }} />
);

export default Column;
