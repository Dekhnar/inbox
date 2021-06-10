import { Message, MessagesService } from "@api";
import { useQuery } from "react-query";

const useMessageQuery = (messageId: number, realtorId: number) => {
  return useQuery<Message[], Error>(`MessagesService.getMessages`, async () => {
    const reponse = await MessagesService.getMessageByIds(messageId, realtorId);
    return reponse as Message[];
  });
};

export default useMessageQuery;
