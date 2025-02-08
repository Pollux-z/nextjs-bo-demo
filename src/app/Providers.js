"use client";

import fetcher from "./services/fetcher";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";


export const Provider = ({ children }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
        }}
      >
       {children}
      </SWRConfig>
    </SessionProvider>
  );
};
