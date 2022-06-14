import * as React from "react";
import { QueryClient, QueryClientProvider as RQProvider } from "react-query";

function useConstant(initializer) {
  return React.useState(initializer)[0];
}

function QueryClientProvider({ children }) {
  const queryClient = useConstant(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          useErrorBoundary: false,
          refetchOnWindowFocus: false,
          retry(failureCount, error) {
            if (error.status === 404) return false;
            else if (failureCount < 2) return true;
            else return false;
          },
        },
        mutations: {
          onError: (err, variables, recover) =>
            typeof recover === "function" ? recover() : null,
        },
      },
    });
    return client;
  });

  return <RQProvider client={queryClient}>{children}</RQProvider>;
}

export { QueryClientProvider };
