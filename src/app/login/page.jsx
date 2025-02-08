'use client'

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";





function LoginPage() {
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const router = useRouter();

    const {data: session} = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await signIn("credentials", {
              employeeEmail, password, redirect: false
            })
            if(res.error) {
                setError("Invalid Credeintials");
                return;
            } 
            router.push("/")
        }catch(err){
            console.log(err)
        }
    }
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="">
        {error && (
            <p className="bg-red-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
          <input
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
          type="text" 
          placeholder="User Name" 
          />
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" 
          placeholder="Password" />
          <button type="submit"> Login </button>
        </form>
            
      </div>
      
    </main>
  );
}

export default LoginPage;
