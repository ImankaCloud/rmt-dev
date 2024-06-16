import { createContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { JobItemExpanded } from "../lib/types";

type BookmarksContextType = {
  bookMarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItemExpanded[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookMarkedIds, setBookMarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookMarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookMarkedIds.includes(id)) {
      setBookMarkedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setBookMarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookMarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
