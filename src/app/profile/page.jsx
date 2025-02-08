"use client";

import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Content from './components/Content'

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

function ProfilePage() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main>
        <div className='flex w-full'>

        <div className='w-[244px] mx-3'>
            <Navbar />
        </div>
        <div className="w-full px-2">
          <div className="">
            <Header />
          </div>
          <div className="py-5 px-10 bg-gray-100 h-full">
            <Content />
          </div>
        </div>
        </div>
    </main>
  )
}

export default ProfilePage;
