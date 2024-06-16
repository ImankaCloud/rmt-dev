import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BookmarksContextProvider } from "./contexts/BookmarksContextProvider.tsx";
import { ActiveIdContextProvider } from "./contexts/ActiveIdContextProvider.tsx";
import { SearchTextContextProvider } from "./contexts/SearchTextContextProvider.tsx";
import { JobItemContextProvider } from "./contexts/JobItemsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <ActiveIdContextProvider>
          <SearchTextContextProvider>
            <JobItemContextProvider>
              <App />
            </JobItemContextProvider>
          </SearchTextContextProvider>
        </ActiveIdContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
