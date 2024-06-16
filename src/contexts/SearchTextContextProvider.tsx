import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextType = {
  searchTerm: string;
  debouncedSearchTerm: string;
  handleChangeSearchText: (searchTerm: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

export function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChangeSearchText = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchTerm,
        debouncedSearchTerm,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
