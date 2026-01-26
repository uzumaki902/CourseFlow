import React from "react";
import {
  MdOutlineHome,
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineInfo,
  MdOutlineMail,
  MdHelpOutline,
} from "react-icons/md";

const navItems = [
  { label: "Home", icon: MdOutlineHome },
  { label: "Dashboard", icon: MdOutlineDashboard },
  { label: "Profile", icon: MdOutlinePerson },
  { label: "Settings", icon: MdOutlineSettings },
  { label: "About", icon: MdOutlineInfo },
  { label: "Contact", icon: MdOutlineMail },
  { label: "Help", icon: MdHelpOutline },
];

const BottomDock: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 border-b-0 border-l border-r rounded-tl-lg rounded-tr-lg flex justify-center items-center py-1 z-50 w-auto shadow-card-default hover:shadow-card-hover hover:-translate-y-0.5 hover:scale-102 transition-all duration-250 ease-in-out">
      <ul className="flex w-full justify-between items-center px-1 gap-1">
          {navItems.map(({ icon: Icon }, idx) => (
            <li key={idx} className="flex-1 flex flex-col items-center">
              <button
                className="flex flex-col items-center w-full text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97] cursor-pointer transition-all font-medium px-3 py-3 text-sm focus:outline-none"
              >
                <Icon className="text-2xl" />
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default BottomDock;
