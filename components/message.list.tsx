/** @jsxImportSource theme-ui */

import Column from "@components/_base-column";
import getEnrichedMessage from "@utils/message";
import { Flex, Box, Divider, Text } from "theme-ui";
import { Message } from "@api";
import { useMessagesQuery } from "@data/use-messages.query";
import { useSelectedRealtor } from "@contexts/selected-realtor";
import { useSelectedMessage } from "@contexts/selected_message";
import React, { useRef, useCallback } from "react";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem = ({ message }: MessageListItemProps) => {
  const {
    titleLeading,
    titleTrailing,
    subtitle,
    dateFromNowStr,
    icon,
    read: isRead,
    truncatedBody,
  } = getEnrichedMessage(message);
  const { message: selectedMessage, setMessage } = useSelectedMessage();
  const isSelectedMessage = selectedMessage?.id == message.id;

  const readColor = "gray-700";

  const dateColor = isRead ? readColor : "primary";
  const titleStyle = isRead
    ? {
        color: readColor,
        fontWeight: isSelectedMessage ? "normal" : "300",
      }
    : {
        color: "black",
        fontWeight: "bold",
      };
  const subtitleStyle = isRead
    ? {
        color: readColor,
      }
    : {
        color: "black",
      };
  const handleMessageView = () => {
    return setMessage(message);
  };

  return (
    <Box
      variant={
        isSelectedMessage
          ? "containers.message.read"
          : "containers.message.default"
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
        <div
          sx={{
            ml: "10px",
            flexGrow: 1,
            alignContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Column>
            <div>
              <Text
                color={titleStyle.color}
                variant="text.headline"
                sx={{ fontWeight: titleStyle.fontWeight }}
              >
                {titleLeading}
              </Text>
              <Text
                color={titleStyle.color}
                variant="text.bodyText2"
                sx={{ fontWeight: titleStyle.fontWeight }}
              >
                {titleTrailing}
              </Text>
            </div>
            <Text as="p" variant="text.bodyText2" color={subtitleStyle.color}>
              {subtitle}
            </Text>
            <Text
              as="p"
              variant="text.bodyText2"
              sx={{
                color: readColor,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              css={{
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}
            >
              {truncatedBody}
            </Text>
          </Column>
          <Text
            color={dateColor}
            variant="text.bodyText2"
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            {dateFromNowStr}
          </Text>
        </div>
      </Flex>
    </Box>
  );
};

const MessageList = () => {
  const { realtor } = useSelectedRealtor();
  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useMessagesQuery(realtor?.id!);

  const observer = useRef<IntersectionObserver>();
  const lastMessageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !loadingMore &&
          !loading
        )
          fetchNextPage();
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasNextPage]
  );

  if (isError && error) return <Text>Error</Text>;
  if (!loading && !data?.pages?.[0]?.data?.length)
    return <Text>{"Sorry, No Message Found :("}</Text>;
  return (
    <>
      <div
        sx={{
          borderRight: "1px #D8D8D8 solid",
          maxHeight: "calc(100vh - 60px)",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {data?.pages.map((messages, _idx) => {
          const isLastPage = data?.pages?.length === _idx + 1;
          return (
            <React.Fragment key={_idx}>
              {
                messages?.data?.map((message, index) => {
                  return [
                    isLastPage && messages?.data?.length === index + 1 ? (
                      <div ref={lastMessageElementRef} key={message.id}>
                        <MessageListItem message={message} />
                      </div>
                    ) : (
                      <MessageListItem key={message.id} message={message} />
                    ),
                    <Divider m="0" key={"$" + message.id} />,
                  ];
                })
                // messages?.data && <MessageListItem message={messages?.data[0]} />
              }
            </React.Fragment>
          );
        })}
      </div>
      {hasNextPage && (
        <Flex mt="8px" sx={{ justifyContent: "center" }}>
          <Text>Loading...</Text>
        </Flex>
      )}
    </>
  );
};

export default MessageList;
