/** @jsxImportSource theme-ui */

import { Box, Card, Flex, Text } from "theme-ui";
import Column from "@components/_base-column";
import { useSelectedMessage } from "@contexts/selected_message";
import getEnrichedMessage from "@utils/message";
import useUpdateMessageMutation from "@data/use-message-mutation";
import { useEffect } from "react";
import { useSelectedRealtor } from "@contexts/selected-realtor";
import { Message } from "@api";

const MessageDetail: React.FC = () => {
  const iconSize = 20;
  const spaceBetweenIconAndTitle = 16;
  const paddingLeft = 32;
  const { message } = useSelectedMessage();
  const { realtor } = useSelectedRealtor();
  const {
    titleLeading,
    icon,
    contact: { email, phone } = {},
    dateStr,
    body,
  } = getEnrichedMessage(message!);
  const { setMessage } = useSelectedMessage();
  const { mutate: updateMessage } = useUpdateMessageMutation();

  useEffect(() => {
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
      <Column>
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
                <Text>{titleLeading}</Text>
              </Flex>
              <Flex>
                <Column
                  sx={{
                    marginLeft: iconSize + spaceBetweenIconAndTitle,
                    marginRight: "116px",
                  }}
                >
                  {email && <Text>Email</Text>}
                  {phone && <Text>Téléphone</Text>}
                </Column>
                <Column
                  sx={{
                    marginLeft: iconSize + spaceBetweenIconAndTitle,
                    marginRight: "116px",
                  }}
                >
                  {email && <Text>{email}</Text>}
                  {phone && <Text>{phone}</Text>}
                </Column>
              </Flex>
            </>
          )}
        </Card>
        <Card
          sx={{
            variant: "containers.card",
            minHeight: "637px",
            flexGrow: 2,
            paddingLeft,
            paddingTop: "28px",
            paddingRight: "29px",
          }}
        >
          <Column>
            <Text>{titleLeading}</Text>
            <Text>{dateStr}</Text>
            <Text sx={{ width: "100%", marginTop: 45 }}>{body}</Text>
          </Column>
        </Card>
        <Box sx={{ height: 1 }} />
      </Column>
    </Box>
  );
};

export default MessageDetail;
