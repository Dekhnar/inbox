/** @jsxImportSource theme-ui */

import Column from "@components/_base-column";
import getEnrichedMessage from "@utils/message";
import useUpdateMessageMutation from "@data/use-message-mutation";
import { Box, Card, Flex, Text } from "theme-ui";
import { Message, Realtor } from "@api";
import { useEffect } from "react";
import { useSelectedMessage } from "@contexts/selected_message";
import { useSelectedRealtor } from "@contexts/selected-realtor";
import { useQueryClient } from "react-query";

const MessageDetail: React.FC = () => {
  const iconSize = 20;
  const spaceBetweenIconAndTitle = 16;
  const paddingLeft = 32;
  const { message } = useSelectedMessage();
  const { realtor, setRealtor } = useSelectedRealtor();
  const {
    titleLeading,
    icon,
    contact: { email, phone } = {},
    dateStr,
    body,
  } = getEnrichedMessage(message!);
  const { setMessage } = useSelectedMessage();
  const { mutate: updateMessage } = useUpdateMessageMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!message?.read)
      updateMessage(
        {
          variables: {
            messageId: message?.id!,
            realtorId: realtor?.id!,
            requestBody: {
              read: true,
            },
          },
        },
        {
          onSuccess: (data) => {
            if (data.hasOwnProperty("id")) {
              const message = data as Message;
              setMessage(message);
              const newRealtor = queryClient
                .getQueryData<Realtor[]>(`RealtorsService.getRealtors`)
                ?.find((r) => r.id == realtor?.id);
              setRealtor(newRealtor);
            }
          },
        }
      );
  }, [message?.id]);

  return (
    <Box
      variant="containers.page"
      paddingLeft="28px"
      paddingRight="28px"
      paddingTop="36px"
      paddingBottom="33px"
      sx={{ height: "100%" }}
    >
      <Column sx={{ height: "100%" }}>
        <Card
          sx={{
            variant: "containers.card",
            minHeight: "122px",
            marginBottom: "22px",
            flexGrow: 1,
            paddingLeft,
            paddingTop: "22px",
          }}
        >
          {icon && (
            <>
              <Flex>
                <i
                  className={icon}
                  sx={{
                    variant: "icons.disabled",
                    marginRight: spaceBetweenIconAndTitle,
                    height: iconSize,
                    width: iconSize,
                  }}
                ></i>
                <Text variant="text.headline">{titleLeading}</Text>
              </Flex>
              <Flex>
                <Column
                  sx={{
                    marginLeft: iconSize + spaceBetweenIconAndTitle,
                    marginRight: "116px",
                  }}
                >
                  {email && (
                    <Text variant="text.subtitle" color="black-400">
                      Email
                    </Text>
                  )}
                  {phone && (
                    <Text variant="text.subtitle" color="black-400">
                      Téléphone
                    </Text>
                  )}
                </Column>
                <Column
                  sx={{
                    marginLeft: iconSize + spaceBetweenIconAndTitle,
                    marginRight: "116px",
                  }}
                >
                  {email && (
                    <Text variant="text.subtitle" color="primary">
                      {email}
                    </Text>
                  )}
                  {phone && (
                    <Text variant="text.subtitle" color="primary">
                      {phone}
                    </Text>
                  )}
                </Column>
              </Flex>
            </>
          )}
        </Card>
        <Card
          sx={{
            variant: "containers.card",
            height: "100%",
            flexGrow: 2,
            paddingLeft,
            paddingTop: "28px",
            paddingRight: "29px",
          }}
        >
          <Column>
            <Text variant="text.headline">{titleLeading}</Text>
            <Text variant="text.bodyText2" color="gray-700">
              {dateStr}
            </Text>
            <Text
              variant="text.bodyText1"
              color="black-400"
              sx={{ width: "100%", marginTop: 45 }}
            >
              {body}
            </Text>
          </Column>
        </Card>
      </Column>
    </Box>
  );
};

export default MessageDetail;
