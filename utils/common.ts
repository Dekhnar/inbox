import {
  QueryObserverIdleResult,
  QueryObserverLoadingResult,
  QueryObserverResult,
  RefetchOptions,
} from "react-query";

export class AsyncIdle<T, S> implements QueryObserverIdleResult<T, S> {
  data: undefined;
  error: null;
  isError: false;
  isIdle: true;
  isLoading: false;
  isLoadingError: false;
  isRefetchError: false;
  isSuccess: false;
  status: "idle";
  dataUpdatedAt: number;
  errorUpdatedAt: number;
  failureCount: number;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isStale: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T, S>>;
  remove: () => void;
}
