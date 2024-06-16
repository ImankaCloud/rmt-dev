import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemContextType = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  jobItemsSortedAndSliced: JobItem[];
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortValue: SortBy) => void;
};

export const JobItemContext = createContext<JobItemContextType | null>(null);

export function JobItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchTerm } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived state
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return Number(a.daysAgo) - Number(b.daysAgo);
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  // handlers
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortValue: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortValue);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemContext.Provider value={contextValue}>
      {children}
    </JobItemContext.Provider>
  );
}
