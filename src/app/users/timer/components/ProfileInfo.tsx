import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FaStreetView, FaUsersRectangle } from "react-icons/fa6";
import ProfileInfomation from "./ProfileInfomation";
import ProfileLeave from "./ProfileLeave";
import { useSession } from "next-auth/react";
import { UsersType } from "@/interfaces/User";
import ProfileProject from "./ProfileIProject";

const ProfileInfo: React.FC<{ user: UsersType }> = ({ user }) => {
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const sessionRole = session?.user?.role;

  return (
    <>
      <TabGroup>
        <TabList className={`space-x-10`}>
          <Tab className="data-[selected]:bg-[#845ADE] data-[selected]:text-white px-3 py-2 data-[selected]:rounded-md data-[selected]:shadow-sm data-[selected]:font-bold text-sm min-w-28 text-[#845ADE] ">
            <div className="flex gap-2 justify-center">
              <FaStreetView size={20} /> Infomation
            </div>
          </Tab>
          <Tab className="disabled:opacity-70 disabled:text-gray-600 data-[selected]:bg-[#845ADE] data-[selected]:text-white px-3 py-2 data-[selected]:rounded-md data-[selected]:shadow-sm data-[selected]:font-bold text-sm min-w-28 text-[#845ADE] ">
            <div className="flex gap-2 justify-center">
              <FaUsersRectangle size={20} /> Project
            </div>
          </Tab>
        </TabList>
        <TabPanels className={`mt-5`}>
          <TabPanel>
            {sessionId === user?._id || sessionRole != "User" ? (
              <ProfileLeave user={user} />
            ) : null}
            <ProfileInfomation user={user} />
          </TabPanel>
          <TabPanel>
            <ProfileProject data={user} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default ProfileInfo;
