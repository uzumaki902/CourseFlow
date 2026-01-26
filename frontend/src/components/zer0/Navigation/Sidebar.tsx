
import React, { useState, useRef } from "react";
// Removed unused filled icons; only outline icons are used below
import {
  MdOutlineHome,
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineSettings,
  MdOutlineInfo,
  MdOutlineMail,
  MdHelpOutline,
  MdOutlineChevronRight
} from "react-icons/md";

const navItems = [
  { label: "Home", icon: MdOutlineHome },
  { label: "Dashboard", icon: MdOutlineDashboard, chevron: true },
  { label: "Profile", icon: MdOutlinePerson },
  { label: "Settings", icon: MdOutlineSettings, chevron: true },
  { label: "About", icon: MdOutlineInfo, chevron: true },
  { label: "Contact", icon: MdOutlineMail },
  { label: "Help", icon: MdHelpOutline, chevron: true },
];

const submenuContent = {
  Dashboard: ["Overview", "Stats", "Reports"],
  Settings: ["Profile", "Account", "Preferences"],
  About: ["Team", "Mission", "Contact"],
  Help: ["FAQ", "Support", "Docs"],
};

const getSubmenuItems = (label: string) =>
  submenuContent[label as keyof typeof submenuContent] || ["Submenu Item 1", "Submenu Item 2"];

const Sidebar: React.FC = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuTimeout = useRef<number | null>(null);

  const clearTimeoutRef = () => {
    if (submenuTimeout.current) {
      clearTimeout(submenuTimeout.current);
      submenuTimeout.current = null;
    }
  };

  const handleSubmenuOpen = (label: string) => {
    clearTimeoutRef();
    setOpenSubmenu(label);
  };

  const handleSubmenuClose = () => {
    clearTimeoutRef();
    submenuTimeout.current = window.setTimeout(() => setOpenSubmenu(null), 200);
  };
  return (
    <aside className="w-48 h-auto rounded-tr-lg rounded-br-lg bg-white border border-l-0 border-gray-300 flex flex-col items-center justify-center shadow-card-default">
      <nav className="w-full py-1 px-1 flex flex-col items-center">
        <ul className="list-none w-full flex flex-col">
          {navItems.map(({ label, icon: Icon, chevron }) => (
            <li
              key={label}
              className={`text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors duration-150 ease-out font-medium w-full px-3 py-2 text-left text-sm flex items-center${chevron ? " relative" : " gap-2"}`}
              onMouseEnter={() => chevron && handleSubmenuOpen(label)}
              onMouseLeave={() => chevron && handleSubmenuClose()}
            >
              <span className="flex items-center gap-2">
                <Icon className="mr-2 text-xl" /> {label}
              </span>
              {chevron && <MdOutlineChevronRight className="text-gray-400 absolute right-1 text-lg" />}
              {/* Submenu with Tailwind animation */}
              {chevron && (
                <div
                  className={`absolute left-full top-0 ml-2.5 bg-white rounded-md border border-gray-300 z-10 min-w-[140px] p-1 transition-all duration-200 ease-out transform will-change-transform shadow-card-default ${openSubmenu === label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  style={{ visibility: 'visible' }}
                  onMouseEnter={() => handleSubmenuOpen(label)}
                  onMouseLeave={handleSubmenuClose}
                >
                  <ul className="flex flex-col gap-1">
                    {getSubmenuItems(label).map((item) => (
                      <li
                        key={item}
                        className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer text-sm transition-colors duration-150 ease-out"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;