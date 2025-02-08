import {
  CiViewBoard,
  CiBullhorn,
  CiDeliveryTruck,
  CiBoxList,
  CiUser,
  CiCalendarDate,
  CiAlignTop,
  CiViewList,
  CiShuffle,
  CiMoneyCheck1,
} from "react-icons/ci";

export const Teams = [
  "Business Assessment & Research",
  "Business Development",
  "Business Operation",
  "Corparate Development",
  "Disrupttech & Technical Businees",
  "Digital Innovation & Organization",
  "Digital Transformation",
  "Graphic Designer",
  "Marketing",
  "Strategic Planning",
  "Telecom Media & Technology",
];

export const Role = ["Admin","Project Manager", "Co-Admin", "Co-Project", "User"];

export const Status = ["Proposal", "Active", "Finished", "Lost"];

export const Time = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const Floor = [
  "B1",
  "B2",
  "G",
  "1",
  "1A",
  "1B",
  "1C",
  "2",
  "2A",
  "2B",
  "2C",
  "3",
  "3A",
  "3B",
  "3C",
  "4",
  "4A",
  "4B",
  "4C",
];

export const MeetingRoom = ["Major Room", "Minor Room", "Back office Room"];

export const StatusApprove = ["Pending", "Reject", "Approve", "Cancel"];

export const StatusResign = ["Pending", "Approved", "Rejected"];

export const StatusApproveTimeOff = [
  "Pending",
  "Reject",
  "Approve",
  "Complete",
];

export const StatusRequestTimeOff = [
  "Vacation",
  "Personal Leave",
  "Sick Leave",
];

export const NavAadmin = {
  Home: [
    { value: "Announcement", status: true, href: `/admin`, icon: CiBullhorn },
    {
      value: "Dashboard",
      status: true,
      href: `/admin/dashboard`,
      icon: CiViewBoard,
    },
  ],
  Admin: [
    {
      value: "Asset Record",
      status: false,
      href: `/admin`,
      icon: CiDeliveryTruck,
    },
    {
      value: "Car Record",
      status: true,
      href: `/admin/carrecordAdmin`,
      icon: CiDeliveryTruck,
    },
    {
      value: "Meeting Room",
      status: true,
      href: `/admin/meetingroomAdmin`,
      icon: CiBoxList,
    },
  ],
  Timer: [
    { value: "TIMER", status: true, href: `/admin/timerAdmin`, icon: CiUser },
    {
      value: "TIME-OFF",
      status: true,
      href: `/admin/timeoffAdmin`,
      icon: CiCalendarDate,
    },
    {
      value: "Swap-Date",
      status: true,
      href: `/admin/swapdateAdmin`,
      icon: CiShuffle,
    },
    {
      value: "Top-Up",
      status: true,
      href: `/admin/topupAdmin`,
      icon: CiMoneyCheck1,
    },
  ],
  Project: [
    {
      value: "Project",
      status: true,
      href: `/admin/projectAdmin`,
      icon: CiAlignTop,
    },
    {
      value: "Billability",
      status: true,
      href: `/admin/projectAdmin/billability`,
      icon: CiViewList,
    },
  ],
};
// { MeetingRoom: { value: "Meeting Room", status: true } },
// { AssetRecord: { value: "Meeting Room", status: false } },

export const NameMeetingRoom = [
  {
    value: "Major Room",
    nameEng: "Rama IV",
    nameTh: "พระราม 4",
    imgRoom: "https://img2.pic.in.th/pic/Meeting-Room.jpg",
  },
  {
    value: "Minor Room",
    nameEng: "Samyan",
    nameTh: "สามย่าน",
    imgRoom: "https://img2.pic.in.th/pic/Meeting-Room-2.jpg",
  },
  {
    value: "Back office Room",
    nameEng: "Phaya Thai",
    nameTh: "พญาไท",
    imgRoom: "https://img5.pic.in.th/file/secure-sv1/Meeting-Room-3.jpg",
  },
];

export const CategorysShare = [
  "AIBOX",
  "External Sharing",
  "Internal Sharing",
  // "Public Sharing",
  // "Private Sharing",
];