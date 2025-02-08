import React from "react";
import Image from "next/image";

import WalkFame from "../../../public/header-removebg.png";

type HeaderType = {
  textHeader: string;
  textContent: string;
  hrefContent: string;
  textContentSub: string;

};

const HeaderContent: React.FC<HeaderType> = ({
  textHeader = "",
  textContent = "",
  hrefContent = "",
  textContentSub = "",
}) => {
  return (
    <>
      <div
        className={
          "bg-blue-100 px-8 rounded-lg flex justify-between items-center min-h-[100px]"
        }
      >
        <div className="">
          <h1 className="text-xl">{textHeader}</h1>
          <ul className="font-light text-sm mt-1">
            <li className="flex">
              <a
                href={hrefContent}
                className="font-semibold hover:bg-blue-600 hover:text-white px-2 rounded-lg"
              >
                {textContent}
              </a>
              {textContentSub && (
                <ul className="list-disc px-6">
                  <li>{textContentSub}</li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="overflow-hidden">
          <Image
            src={WalkFame}
            width={100}
            height={20}
            className="-mb-8 h-auto w-auto hidden md:block"
            alt="picheadercontent"
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
