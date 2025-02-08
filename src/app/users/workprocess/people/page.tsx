"use client";

import React, { ReactElement, useState } from "react";
import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import Fulltime from "../components/Fulltime";
import Intern from "../components/Intern";

import { peoples, PeopleType } from "@/app/db/people";

function Page(): ReactElement {
  const [sortData, setSortData] = useState(peoples[0].value);

  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`Work Process > People`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="bg-white mt-5">
        <div className="flex justify-center py-5">
          <ul className="flex gap-3">
            {peoples.map((people: PeopleType, index: number) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => setSortData(people.value)}
                  className="py-1 px-2 bg-blue-50 text-blue-600 rounded-lg text-md hover:bg-blue-600 hover:text-white transition"
                >
                  {people.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex py-4 items-center justify-center px-6 ">
          {sortData === "fulltime" ? (
            <Fulltime />
          ) : sortData === "intern" ? (
            <Intern />
          ) : undefined} 
        </div>
      </div>
    </ContainerUser>
  );
}

export default Page;
