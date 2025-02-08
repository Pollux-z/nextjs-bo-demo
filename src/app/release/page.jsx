import React from "react";
import ContainerUser from "../components/ContainerUser";
import HeaderContent from "../components/HeaderContent";
import {
  ReleaseV204,
  ReleaseV203,
  ReleaseV202,
  ReleaseV201,
  ReleaseV200,
  ReleaseV102,
  Release101
} from "./components/ReleaseNote";

function page() {
  return (
    <ContainerUser>
      <div className="bg-white p-5 rounded-md shadow-sm">
        <h5 className="text-2xl">Release Notes</h5>
        <div>
          <ReleaseV204 />
        </div>
        <div>
          <ReleaseV203 />
        </div>
        <div>
          <ReleaseV202 />
        </div>
        <div>
          <ReleaseV201 />
        </div>
        <div>
          <ReleaseV200 />
        </div>
        <div>
          <ReleaseV102 />
        </div>
        <div>
          <Release101 />
        </div>
      </div>
    </ContainerUser>
  );
}

export default page;
