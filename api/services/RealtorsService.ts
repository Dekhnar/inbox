/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Error } from "../models/Error";
import type { Realtor } from "../models/Realtor";
import { request as __request } from "../core/request";

export class RealtorsService {
  /**
   * Get all the realtors
   * Returns a list of realtors
   * @param page
   * @param pageSize
   * @returns Realtor OK
   * @returns Error Default error response
   * @throws ApiError
   */
  public static async getRealtors(
    page: number = 1,
    pageSize: number = 10
  ): Promise<Array<Realtor> | Error> {
    const result = await __request({
      method: "GET",
      path: `/realtors/`,
      query: {
        page: page,
        page_size: pageSize,
      },
      errors: {
        422: `Unprocessable Entity`,
      },
    });
    return result.body;
  }

  /**
   * Get realtor by ID
   * Returns a dictionnary with realtor information (id, title, ...),
   * 404 if realtor is not found
   * @param realtorId
   * @returns Realtor OK
   * @returns Error Default error response
   * @throws ApiError
   */
  public static async getRealtorById(
    realtorId: number
  ): Promise<Realtor | Error> {
    const result = await __request({
      method: "GET",
      path: `/realtors/${realtorId}`,
      errors: {
        404: `Realtor not found`,
      },
    });
    return result.body;
  }
}
