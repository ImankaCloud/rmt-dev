import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type BoomarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BoomarkIconProps) {
  const context = useBookmarksContext();
  const { bookMarkedIds, handleToggleBookmark } = context;

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookMarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
