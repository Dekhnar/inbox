import Inbox from "@components/inbox";
import React, { useRef } from "react";
import theme from "@common/theme";
import type { AppProps /*, AppContext */ } from "next/app";
import { Hydrate } from "react-query/hydration";
import { OpenAPI } from "@api";
import { QueryClient, QueryClientProvider } from "react-query";
import { Theme, ThemeProvider } from "theme-ui";

OpenAPI.BASE = process.env.NEXT_PUBLIC_REST_API_ENDPOINT as string;

export default function CustomApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme as Theme}>
          <Inbox>
            <Component {...pageProps} />
          </Inbox>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
