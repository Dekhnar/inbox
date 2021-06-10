import { Realtor, MessagesService } from "@api";
import { useQuery } from "react-query";

const useMessageQuery = (messageId: number, realtorId: number) => {
  return useQuery<Realtor[], Error>(`MessagesService.getMessages`, async () => {
    const reponse = await MessagesService.getMessageByIds(messageId, realtorId);
    return reponse as Realtor[];
  });
};

export default useMessageQuery;
