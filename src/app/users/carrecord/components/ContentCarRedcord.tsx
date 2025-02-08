"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCarrecord, useReserves } from "@/app/services/queries";
import CardFilterCarrecord from "./CardFilterCarrecord";
import Loading from "@/app/loading";

import CarrecordTable from "@/app/components/table/CarrecordTable";

const ContentCarRedcord: React.FC = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 mt-5">
        <div className="bg-white rounded-md shadow-md py-2 px-3 ">
          <div className="grid lg:grid-cols-2 justify-center gap-1 mt-2 grid-cols-1 ">
            <Link
              href="/users/carrecord/create"
              className="bg-blue-500 text-white w-full text-center py-2 rounded-md text-sm"
            >
              Reserve{" "}
            </Link>
            <Link
              href="/users/carrecord/record"
              className="bg-green-500 text-white w-full text-center py-2 rounded-md text-sm"
            >
              Record{" "}
            </Link>
          </div>
          <div className="mx-3 mt-5 ">
            <CardFilterCarrecord />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-md shadow-md">
            <CarrecordTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentCarRedcord;
