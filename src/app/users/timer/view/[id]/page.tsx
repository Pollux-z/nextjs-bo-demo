"use client";

import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import React from "react";
import Profile from "../../components/Profile";
import { useUser } from "@/app/services/queries";
import Loading from "@/app/loading";
import Error from "@/app/Error";

type PageProps = {
  params: {
    id: string;
  };
};

function Page({ params }: PageProps): React.ReactElement {
  const { id } = params;
  const { data: getUser, isLoading, isValidating, error } = useUser(id);
  const user = getUser?.user;

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <ContainerUser>
      <HeaderContent
        textHeader={`${user?.nameEng}`}
        textContent={``}
        textContentSub={``}
        hrefContent={``}
      />
      <div className="mt-5 w-full">
        <Profile id={id} />
      </div>
    </ContainerUser>
  );
}

export default Page;
