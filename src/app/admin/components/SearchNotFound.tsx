import React from "react";
import Image from "next/image";
import IconSeach from "../../../../public/Not Found Icon.png";

const SearchNotFound: React.FC = () => {
  return (
    <div className="grid justify-center">
      <Image
        src={IconSeach}
        width={50}
        height={50}
        className="mx-auto"
        alt="iconSeach"
      />
      <p className="mt-2 text-sm">Sorry, Data not found</p>
    </div>
  );
};

export default SearchNotFound;
