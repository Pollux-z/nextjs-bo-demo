"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useReserves } from "@/app/services/queries";

import Loginicon from "../../../../../public/login-bg.svg";


function SignInPage() {
  const { data: session } = useSession();
  if (session) redirect("/");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        employeeEmail,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credeintials");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="">
      <div className="">
        <div className="grid lg:grid-cols-5  min-h-screen w-full ">
          <div className="col-span-3 bg-blue-50  lg:grid justify-center items-center hidden">
            <div className="">
              <Image src={Loginicon} height={500} width={500} />
            </div>
          </div>

          <div className="grid items-center justify-center col-span-2">
            <div className="w-[380px]">
              <h3 className="text-2xl font-medium">Welcome to BO Support</h3>
              <h5 className="text-xs">
                This website for support in TIME Consulting
              </h5>
              <hr className="my-10" />
              {error && (
                <p className="bg-red-100 text-red-600 px-2 py-2 rounded-md">
                  {error}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 mt-2"
              >
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                  type="text"
                  className="border py-3 px-5 w-full rounded-md text-sm"
                />
                <label htmlFor="username" className="text-sm font-medium">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="border py-3 px-5 w-full rounded-md text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500  text-white py-2 rounded-lg shadow-md mt-5 w-full font-extralight"
                >
                  {" "}
                  Sign In{" "}
                </button>
              </form>
              <p className="mt-10 text-sm">
                Your not account ?{" "}
                <span className="underline decoration-sky-500">
                  Please contact admin
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
