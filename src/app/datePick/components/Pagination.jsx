import React from "react";
import Link from 'next/link'

function Pagination({ items, pageSize, pageIndex, onPageChange }) {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  console.log(pages);


  return (
    <div>
      <ul className="flex ">
        {pages.map((page) => (
          <li key={page} className={page === pageIndex ? "bg-gray-200 rounded-md " : null}>
            <a onClick={() => onPageChange(page)} className="px-3 py-2 cursor-pointer ">{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
