import { Message, MessagesService } from "@api";
import { QueryFunctionContext, useQuery } from "react-query";

export const fetchMessageByIds = async ({
  queryKey,
}: QueryFunctionContext): Promise<Message> => {
  const [_key, params] = queryKey;
  const { realtorId, messageId } = params as {
    realtorId: number;
    messageId: number;
  };
  const response = await MessagesService.getMessageByIds(messageId, realtorId);
  return response as Message;
};

const useMessageQuery = (messageId: number, realtorId: number) => {
  return useQuery<Message, Error>(
    [
      `MessagesService.getMessageByIds`,
      {
        messageId,
        realtorId,
      },
    ],
    fetchMessageByIds
  );
};

export default useMessageQuery;
