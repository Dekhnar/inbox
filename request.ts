/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export async function request(options: ApiRequestOptions): Promise<ApiResult> {
  const url = getUrl(options);
  const response = await sendRequest(options, url);
  const responseBody = await getResponseBody(response);
  const responseHeader = getResponseHeader(response, options.responseHeader);

  const result: ApiResult = {
    url,
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    body: responseHeader,
    header: responseHeader,
  };

  catchErrors(options, result);
  return result;
}
