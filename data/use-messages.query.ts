import { Message, MessagesService, PaginationMetadata } from "@api";
import { request } from "@api/core/request";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";

export type PaginatedMessages = {
  data: Message[];
  paginatorInfo: PaginationMetadata;
};

export const getMessagesByRealtorId = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext): Promise<PaginatedMessages> => {
  const [_key, params] = queryKey;
  const realtorId = params as number;
  const paginator = (pageParam || {}) as PaginationMetadata;
  //! Have to create this method due to none support of headers yet
  //! https://github.com/ferdikoomen/openapi-typescript-codegen/issues/388
  const result = await request({
    method: "GET",
    path: `/realtors/${realtorId}/messages/`,
    query: {
      sort: "date:desc",
      page: paginator?.next_page ?? 1,
      page_size: 10,
    },
    errors: {
      404: `Realtor not found`,
      422: `Unprocessable Entity`,
    },
  });
  const { body: data, headers } = result;
  let paginatorInfo = JSON.parse(
    headers.get("x-pagination")
  ) as PaginationMetadata;
  return { data, paginatorInfo };
};

export const useMessagesQuery = (id: number) => {
  return useInfiniteQuery<PaginatedMessages, Error>(
    [`MessagesService.getMessages`, id],
    getMessagesByRealtorId,
    {
      getNextPageParam: ({ paginatorInfo }) => {
        return paginatorInfo.total_pages != paginatorInfo.page
          ? paginatorInfo
          : undefined;
      },
    }
  );
};
