import React from "react";
import Link from "next/link";

type PaginationType = {
  items: number;
  pageSize: number;
  pageIndex: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  items,
  pageSize,
  pageIndex,
  onPageChange,
}: PaginationType) {

  const pageCount = Math.ceil(items / pageSize);
  const pages: any[] = [];
  if (pageCount <= 3) {
    for (let i = 1; i <= pageCount; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
  } else {
    if (pageIndex > 1) pages.push(1);
    if (pageIndex > 3) pages.push("...");
    for (
      let i = Math.max(1, pageIndex - 1);
      i <= Math.min(pageCount, pageIndex + 1);
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    if (pageIndex < pageCount - 1) pages.push("...");
    if (pageIndex < pageCount && !pages.includes(pageCount)) pages.push(pageCount);
  }


  return (
    <div className="flex space-x-2">
      <button
        type="button"
        onClick={() => onPageChange(pageIndex - 1)}
        className={`px-3 py-1 rounded-md text-sm ${
          pageIndex === 1
            ? " text-gray-500 cursor-not-allowed"
            : "hover:bg-gray-300 hover:text-violet-500 "
        } border border-gray-100`}
        disabled={pageIndex === 1}
      >
        Prev
      </button>
      {pages.map((page: any, index: number) => (
        <button
          key={index}
          type="button"
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 rounded-md text-xs ${
            pageIndex === page ? "bg-violet-500 text-white" : undefined
          } hover:bg-gray-300 hover:text-violet-500 border border-gray-100 min-w-[40px]`}
        >
          {page }
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(pageIndex + 1)}
        className={`px-3 py-1 rounded-md text-sm ${
          pageIndex === pageCount
            ? " text-gray-500 cursor-not-allowed"
            : "hover:bg-gray-300 hover:text-violet-500 "
        } border border-gray-100`}
        disabled={pageIndex === pageCount}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
