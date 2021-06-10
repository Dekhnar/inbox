import { Message, MessagesService } from "@api";
import { useMutation, useQueryClient } from "react-query";

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
      onSuccess: () => {},
      onSettled: () => {
        // ! Can be optimized
        // Always refetch after error or success:
        queryClient.invalidateQueries(`MessagesService.getMessages`);
      },
    }
  );
};

export default useUpdateMessageMutation;
