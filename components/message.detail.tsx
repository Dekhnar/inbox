/** @jsxImportSource theme-ui */

import { Box, Card, Flex, Text } from "theme-ui";
import Column from "@components/_base-column";
import { useSelectedMessage } from "@contexts/selected_message";
import getEnrichedMessage from "@utils/message";

const MessageDetail: React.FC = () => {
  const iconSize = 20;
  const spaceBetweenIconAndTitle = 16;
  const paddingLeft = 32;
  let { message } = useSelectedMessage();
  const {
    titleLeading,
    read,
    icon,
    contact: { email, phone } = {},
    dateStr,
    body,
  } = getEnrichedMessage(
    message || {
      body: "Lorem Ipsum #10200 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "cmiller@gmail.com",
        firstname: "Charles",
        lastname: "Miller",
        phone: "0624496153",
      },
      date: "2021-06-04T21:08:40.107199",
      id: 10200,
      read: false,
      subject: "Appel #10200",
      type: "phone",
    }
  );
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
                    variant: read ? "icons.disabled" : "icons.enabled",
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
            flexGrow: 1,
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
