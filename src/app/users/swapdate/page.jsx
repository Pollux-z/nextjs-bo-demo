"use client";

import ContainerUser from "@/app/components/ContainerUser";
import HeaderContent from "@/app/components/HeaderContent";
import { useSession } from "next-auth/react";
import React from "react";
import TableSwapDate from "./components/TableSwapDate";
import { useSwapDates } from "@/app/services/queries";
import BtnCreate from "@/app/components/button/BtnCreate";
import AlertNoneData from "@/app/components/AlertNoneData";
import Loading from "@/app/loading";
import Error from "@/app/Error";
import CardFilterSwapDate from "./components/CardFilterSwapDate";
import AnnountmentSwapDate from "./AnnountmentSwapDate";
import BtnDirection from "@/app/components/button/BtnDirection";

function Page() {
  const { data: session } = useSession();
  const sessionRole = session?.user?.role;
  const {
    data: getTotalSwapDate,
    isLoading,
    isValidating,
    error,
  } = useSwapDates();
  const totalSwapDate = getTotalSwapDate?.totalSwapDate;

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <ContainerUser>
        <HeaderContent
          textHeader={`Swap Date`}
          textContent={``}
          textContentSub={``}
          hrefContent={``}
        />
        <div>
          <CardFilterSwapDate />
        </div>
        <div className="mt-3">
          <AnnountmentSwapDate />
        </div>
        <div className="bg-white px-2 py-2 mt-3 rounded-md shadow-sm">
          <div className="flex justify-end gap-3">
            {sessionRole != "User" && (
              <BtnCreate href="/users/swapdate/create" btnText={`Create`} />
            )}
            <div>
              <BtnDirection href={`https://timeconsultings.sharepoint.com/:b:/s/TIMEConsulting/ETCykmTzbbRMpedYGq0626wBOelfWnB-AU4PH55JBk8QEg?e=m0uNg2`} btnText={`Form Swap Date`} />
            </div>
          </div>

          <div>
            {totalSwapDate && totalSwapDate?.length > 0 ? (
              <TableSwapDate data={totalSwapDate} />
            ) : (
              <AlertNoneData />
            )}
          </div>
        </div>
      </ContainerUser>
    </div>
  );
}

export default Page;
