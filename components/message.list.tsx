/** @jsxImportSource theme-ui */

import Column from "@components/_base-column";
import getEnrichedMessage from "@utils/message";
import { Flex, Box, Divider, Text } from "theme-ui";
import { Message } from "@api";
import { useMessagesQuery } from "@data/use-messages.query";
import { useSelectedRealtor } from "@contexts/selected-realtor";
import { useSelectedMessage } from "@contexts/selected_message";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const {
    titleLeading,
    titleTrailing,
    subtitle,
    body,
    dateFromNowStr,
    icon,
    read: isRead,
  } = getEnrichedMessage(message);
  const { setMessage } = useSelectedMessage();

  const dateColor = isRead ? "gray-800" : "primary";
  const titleColor = isRead ? "gray-800" : "black";
  const subtitleColor = isRead ? "gray-800" : "black";

  const handleMessageView = () => {
    return setMessage(message);
  };

  return (
    <Box
      variant={
        !isRead ? "containers.message.default" : "containers.message.read"
      }
      onClick={handleMessageView}
    >
      <Flex sx={{ maxHeight: "100%" }}>
        <i
          className={icon}
          sx={{
            variant: isRead ? "icons.disabled" : "icons.enabled",
            height: 18,
            width: 18,
          }}
        ></i>
        <Box
          ml={10}
          sx={{
            flexGrow: 1,
            alignContent: "space-between",
            position: "relative",
          }}
        >
          <Column>
            <Box>
              <Text color={titleColor}>{titleLeading}</Text>
              <Text color={titleColor}>{titleTrailing}</Text>
            </Box>
            <Text color={subtitleColor}>{subtitle}</Text>
            {/* <Text
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {body}
            </Text> */}
          </Column>
          <Text
            color={dateColor}
            sx={{ position: "absolute", right: 0, top: 38.77 - 10 }}
          >
            {dateFromNowStr}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const MessageList = () => {
  const { realtor } = useSelectedRealtor();
  const {
    data,
    isLoading: loading,
    isError,
    error,
  } = useMessagesQuery(realtor.id!);

  if (isError && error) return <Text>Error</Text>;
  if (!loading && !data?.messages)
    return <Text>{"Sorry, No Message Found :("}</Text>;
  if (loading && !data?.messages) return <Text>Loading...</Text>;

  const { data: messages, paginatorInfo } = data?.messages!;

  return (
    <div sx={{ borderRight: "1px #D8D8D8 solid" }}>
      {messages?.map((message) => [
        <MessageListItem key={message.id} message={message} />,
        <Divider m="0" key={"$" + message.id} />,
      ])}
    </div>
  );
};

export default MessageList;
