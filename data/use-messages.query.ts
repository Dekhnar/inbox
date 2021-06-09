import { Message, MessagesService } from "@api";
import { useQuery } from "react-query";

export const useMessagesQuery = (id: number) => {
    return useQuery<Message[], Error>([`MessagesService.getMessages`, id], async () => {
        if(id === -1) return [];
        const reponse = await MessagesService.getMessagesByRealtorId(id);
        if (!Array.isArray(reponse)) {
            // TODO MANAGE ERROR
        }
        return reponse as Message[];
    });
};
