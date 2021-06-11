import { Message, MessagesService, PaginationMetadata, Realtor } from "@api";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import { PaginatedMessages } from "@data/use-messages.query";

export interface IMessageUpdateVariables {
  variables: {
    messageId: number;
    realtorId: number;
    requestBody: Message;
  };
}

const useUpdateMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      variables: { messageId, realtorId, requestBody },
    }: IMessageUpdateVariables) =>
      MessagesService.updateMessage(messageId, realtorId, requestBody),
    {
      onSuccess: (message, { variables: { messageId, realtorId } }) => {
        const realtorsState = queryClient.getQueryState<Realtor[], Error>(
          `RealtorsService.getRealtors`
        );
        const newRealtorsState = realtorsState?.data?.map((r) => {
          if (r.id !== realtorId) return r;
          return {
            ...r,
            unread_messages: r.unread_messages! - 1,
          };
        });
        queryClient.setQueryData(
          `RealtorsService.getRealtors`,
          newRealtorsState
        );
        const messagesState = queryClient.getQueryState<
          InfiniteData<PaginatedMessages>
        >([`MessagesService.getMessages`, realtorId]);
        const newPages = messagesState?.data?.pages.map((p) => ({
          ...p,
          data: p.data.map((m) => {
            if (m.id !== messageId) return m;
            return message;
          }),
        }));
        queryClient.setQueryData(
          [`MessagesService.getMessages`, realtorId],
          (data) => ({
            pages: newPages,
            pageParams: (data as InfiniteData<PaginatedMessages>).pageParams,
          })
        );
      },
      onError: () => {
        queryClient.invalidateQueries(`MessagesService.getMessages`);
      },
    }
  );
};

export default useUpdateMessageMutation;
