import { Message, MessagesService, PaginationMetadata } from "@api";
import { request } from "@api/core/request";
import { useQuery } from "react-query";



//! Have to create this method due to none support of headers yet
//! https://github.com/ferdikoomen/openapi-typescript-codegen/issues/388

type PaginatedMessages = {
  messages: {
    data: Message[];
    paginatorInfo: PaginationMetadata;
  }
};

const getMessagesByRealtorId = async (
  realtorId: number,
  sort?: 'id:asc' | 'id:desc' | 'date:asc' | 'date:desc',
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedMessages | Error> => {
  const result = await request({
    method: 'GET',
    path: `/realtors/${realtorId}/messages/`,
    query: {
      'sort': sort,
      'page': page,
      'page_size': pageSize,
    },
    errors: {
      404: `Realtor not found`,
      422: `Unprocessable Entity`,
    },
  });
  const { body: data, headers } = result;
  const paginatorInfo = JSON.parse(headers.get("x-pagination")) as PaginationMetadata;
  return { messages: { data, paginatorInfo } };
}

export const useMessagesQuery = (id: number) => {
  return useQuery<PaginatedMessages, Error>(
    [`MessagesService.getMessages`, id],
    async () => {
      const reponse = await getMessagesByRealtorId(id);
      return reponse as PaginatedMessages;
    }
  );
};
