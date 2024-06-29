import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ErrorBoundary } from "react-error-boundary"

import ErrorFallback from "./ui/ErrorFallback"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { LiffContextProvider } from "./context/LiffContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <LiffContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </LiffContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
