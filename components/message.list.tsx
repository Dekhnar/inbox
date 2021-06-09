import { Flex, Box, Divider, Image, Text } from "theme-ui";
import { Message } from "@api";
import { useMessagesQuery } from "@data/use-messages.query";
import { useSelectedRealtor } from "@contexts/selected-realtor";

const getUserFullName = ({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) => `${firstname} ${lastname}`;

const getMessageTitle = (message: Message) => {
  const { type, contact } = message;
  const { firstname, lastname } = message?.contact ?? {};
  const userFullName =
    firstname && lastname ? getUserFullName({ firstname, lastname }) : "";
  return userFullName
    ? userFullName
    : type === "phone"
    ? contact?.phone ?? ""
    : "";
};

const getDateString = (message: Message) => {
  return "DATE";
};

const getEnrichedMessage = (
  message: Message
): Message & {
  titleLeading: string;
  subtitle: string;
  dateStr: string;
  titleTrailing: string;
} => {
  const titleLeading = getMessageTitle(message);
  const phone = message?.contact?.phone;
  const titleTrailing =
    titleLeading && phone && titleLeading != phone ? `(${phone})` : "";
  const dateStr = getDateString(message);
  const subtitle = message?.subject || "";
  return { ...message, titleLeading, dateStr, subtitle, titleTrailing };
};

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const {
    titleLeading,
    titleTrailing,
    subtitle,
    body: caption,
    dateStr,
  } = getEnrichedMessage(message);

  return (
    <Box variant="containers.message.default">
      <Flex sx={{ maxHeight: "100%" }}>
        <Image
          src="http://via.placeholder.com/18/18"
          sx={{ height: 18, width: 18, minHeigh: 18, minWidth: 18 }}
        />
        <Box
          ml={10}
          sx={{
            flexGrow: 1,
            alignContent: "space-between",
            position: "relative",
          }}
        >
          <Flex sx={{ flexDirection: "column" }}>
            <Box>
              <Text>{titleLeading}</Text>
              <Text>{titleTrailing}</Text>
            </Box>
            <Text>{subtitle}</Text>
            <Text
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {caption}
            </Text>
          </Flex>
          <Text sx={{ position: "absolute", right: 0, top: 38.77 - 10 }}>
            {dateStr}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

const MessageList = () => {
  const { realtor } = useSelectedRealtor();
  const {
    data: messages,
    isLoading: loading,
    isError,
    error,
  } = useMessagesQuery(realtor?.id ?? -1);

  if (isError && error) return <Text>Error</Text>;
  if (!loading && !messages?.length)
    return <Text>{"Sorry, No Message Found :("}</Text>;
  if (loading && !messages?.length) return <Text>Loading...</Text>;

  return (
    <Box>
      {messages?.map((message) => [
        <MessageListItem key={message.id} message={message} />,
        <Divider m="0" />,
      ])}
    </Box>
  );
};

export default MessageList;
