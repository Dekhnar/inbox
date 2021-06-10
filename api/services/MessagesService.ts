/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Error } from "../models/Error";
import type { Message } from "../models/Message";
import { request as __request } from "../core/request";

export class MessagesService {
  /**
   * Get all the messages of one realtor
   * Returns a list of messages of one realtor.
   * 404 if realtor is not found
   * @param realtorId
   * @param sort
   * @param page
   * @param pageSize
   * @returns Message OK
   * @returns Error Default error response
   * @throws ApiError
   */
  public static async getMessagesByRealtorId(
    realtorId: number,
    sort?: "id:asc" | "id:desc" | "date:asc" | "date:desc",
    page: number = 1,
    pageSize: number = 10
  ): Promise<Array<Message> | Error> {
    const result = await __request({
      method: "GET",
      path: `/realtors/${realtorId}/messages/`,
      query: {
        sort: sort,
        page: page,
        page_size: pageSize,
      },
      errors: {
        404: `Realtor not found`,
        422: `Unprocessable Entity`,
      },
    });
    return result.body;
  }

  /**
   * Get one message by ID.
   * Returns a single message
   * 404 if realtor is not found
   * 404 if message is not found
   * @param messageId
   * @param realtorId
   * @returns Message OK
   * @returns Error Default error response
   * @throws ApiError
   */
  public static async getMessageByIds(
    messageId: number,
    realtorId: number
  ): Promise<Message | Error> {
    const result = await __request({
      method: "GET",
      path: `/realtors/${realtorId}/messages/${messageId}`,
      errors: {
        404: `Realtor or Message not found`,
      },
    });
    return result.body;
  }

  /**
   * Update a message attribute.
   * Mark a message as read and returns the message representation,
   * 404 if message is not found.
   * 404 if realtor is not found.
   * @param messageId
   * @param realtorId
   * @param requestBody
   * @returns Message OK
   * @returns Error Default error response
   * @throws ApiError
   */
  public static async updateMessage(
    messageId: number,
    realtorId: number,
    requestBody: Message
  ): Promise<Message | Error> {
    const result = await __request({
      method: "PATCH",
      path: `/realtors/${realtorId}/messages/${messageId}`,
      body: requestBody,
      errors: {
        404: `Realtor or Message not found`,
        422: `Unprocessable Entity`,
      },
    });
    return result.body;
  }
}
