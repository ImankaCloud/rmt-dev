export type JobItem = {
  id: number;
  relevanceScore: number;
  badgeLetters: string;
  title: string;
  company: string;
  daysAgo: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyURL: string;
};

export type SortBy = "relevant" | "recent";

export type PageDirection = "next" | "previous";
