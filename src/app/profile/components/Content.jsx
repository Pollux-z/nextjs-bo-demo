import React from "react";
import Image from "next/image";
import Link from "next/link";

function Content() {
  return (
    <div className="">
      <div>
        <h1 className="text-3xl">Profile</h1>
      </div>
      <div className="bg-white w-full mt-5 py-10 px-5 grid grid-cols-5 items-center rounded-md ">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={100}
            height={100}
            className="h-[140px] w-[140px] rounded-full"
          />
        </div>
        <div className="col-span-3">
          <h3 className="text-3xl">John wick</h3>
          <h4 className="text-lg">Team title</h4>
          <h5 className="text-sm text-gray-400">Department</h5>
        </div>
        <div>
          <Link
            href="/"
            className="bg-blue-100 text-blue-600 py-2 px-4 rounded-md shadow-md font-bold"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 gap-5">
        <div className="bg-white  py-7 px-5 rounded-md col-span-2">
          <div>
            <h3 className="text-3xl">Detail</h3>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-8">
            <div>
              <h5 className="text-lg">Full Name (Eng)</h5>
              <p className="text-sm">John Wick</p>
            </div>
            <div>
              <h5 className="text-lg">Full Name (Thai)</h5>
              <p className="text-sm">จอร์น วิค</p>
            </div>
            <div>
              <h5 className="text-lg">Nick Name (Thai)</h5>
              <p className="text-sm">วิค</p>
            </div>
            <div>
              <h5 className="text-lg">Email</h5>
              <p className="text-sm">jogn.w@timeconsulting.co.th</p>
            </div>
            <div>
              <h5 className="text-lg">Title</h5>
              <p className="text-sm">IT engineer</p>
            </div>
            <div>
              <h5 className="text-lg">TEAM</h5>
              <p className="text-sm">DTB</p>
            </div>
            <div>
              <h5 className="text-lg">Telephone</h5>
              <p className="text-sm">+00-0000-0000</p>
            </div>
            <div>
              <h5 className="text-lg">Birth Day</h5>
              <p className="text-sm">16 Feb 1998</p>
            </div>
            <div>
              <h5 className="text-lg">Start Day</h5>
              <p className="text-sm">02 Feb 2024</p>
            </div>
            <div>
              <h5 className="text-lg">Team Lead</h5>
              <p className="text-sm">Etan Hunt</p>
            </div>
          </div>
        </div>
        <div className="bg-white  py-10 px-5 rounded-md">
          <div>
            <h3 className="text-3xl">Team</h3>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="flex items-center gap-3">
              <Image
                width={20}
                height={20}
                className="h-10 w-10 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              />
              <div>
                <p className="text-sm">Etan Hunt</p>
                <p className="text-xs">Manager Team</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                width={20}
                height={20}
                className="h-10 w-10 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1687832783818-8857f0c07ea4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              />
              <div>
                <p className="text-sm">Esabert Wakaya</p>
                <p className="text-xs">Manager Team</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image
                width={20}
                height={20}
                className="h-10 w-10 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              />
              <div>
                <p className="text-sm">Etan Hunt</p>
                <p className="text-xs">Manager Team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
