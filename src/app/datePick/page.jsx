"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useReserveLimit } from "../services/queries";
import useSWR from "swr";
import fetcher from "../services/fetcher";
import Pagination from "./components/Pagination";
import { paginate } from "../helpers/paginate";

function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;

  const onPageChange = (page) => {
    setPageIndex(page);
  };

  // The API URL includes the page index, which is a React state.
  const { data } = useSWR(`/api/totalReserve`, fetcher);

  console.log("🚀 ~ Page ~ data:", data)
  const paginatedPosts = paginate(data?.totalReserve, pageIndex, pageSize);
  console.log("🚀 ~ App ~ paginatedPosts:", paginatedPosts)
 

  return (
    <>
      <div>
        <div>
          {paginatedPosts?.map((val, index) => (
            <p key={index}>{val.subject}</p>
          ))}
        </div>
        <div>
          <Pagination
            items={data?.totalReserve.length}
            pageIndex={pageIndex} 
            pageSize={pageSize} 
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}
export default Page;
