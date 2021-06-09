import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRef } from "react";
import { Theme, ThemeProvider } from "theme-ui";
import theme from "@common/theme";
import { OpenAPI } from "@api";

OpenAPI.BASE = process.env.NEXT_PUBLIC_REST_API_ENDPOINT as string;

export default function CustomApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider theme={theme as Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
