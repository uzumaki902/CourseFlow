
import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";

const navItems = [
  { label: "Home" },
  { label: "Dashboard", submenu: ["Overview", "Stats", "Reports"] },
  { label: "Profile" },
  { label: "Settings", submenu: ["Profile", "Account", "Preferences"] },
  { label: "About", submenu: ["Team", "Mission", "Contact"] },
];

const Navbar: React.FC = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuTimeout = useRef<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const openMenu = (label: string) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    setOpenSubmenu(label);
  };
  const closeMenu = () => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
    submenuTimeout.current = window.setTimeout(() => setOpenSubmenu(null), 200);
  };

  return (
    <>
      <nav className="fixed top-4 left-[5%] right-[5%] bg-white border border-gray-300 rounded-md flex items-center py-2 px-2 z-50 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto shadow-card-default">
  <div className="flex items-center w-full md:w-auto md:gap-1 md:justify-center">
        <button className="mr-0 md:mr-16 font-architype px-4 font-bold text-gray-900 text-2xl active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out">ZER0</button>
          <ul className="hidden md:flex justify-between items-center gap-4">
          {navItems.map(({ label, submenu }) => (
            <li
              key={label}
              className="flex-1 flex flex-col items-center relative"
              onMouseEnter={() => submenu && openMenu(label)}
              onMouseLeave={() => submenu && closeMenu()}
            >
              <button
                className="flex flex-row items-center w-full text-gray-700 rounded-sm hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out font-medium text-sm px-1 focus:outline-none"
                aria-label={label}
              >
                <span className="text-sm px-1 py-2">{label}</span>
                {submenu && <MdKeyboardArrowDown className="text-gray-400 text-lg ml-1" />}
              </button>
              {submenu && (
                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 mt-4 bg-white rounded-md border border-gray-300 z-10 min-w-[140px] p-1 transition-all duration-200 ease-out transform will-change-transform shadow-card-default ${openSubmenu === label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  onMouseEnter={() => openMenu(label)}
                  onMouseLeave={closeMenu}
                >
                  <ul className="flex flex-col gap-1">
                    {submenu.map((item) => (
                      <li
                        key={item}
                        className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer text-sm transition-all duration-150 ease-out active:scale-[0.97]"
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
        <button
          className="md:hidden flex items-center text-gray-700 hover:text-gray-900 active:scale-[0.97] px-1 py-2 rounded-sm cursor-pointer transition-all duration-150 ease-out ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <MdClose className="text-lg mr-2 transition-transform duration-150 ease-out" />
          ) : (
            <MdMenu className="text-lg mr-2 transition-transform duration-150 ease-out" />
          )}
        </button>
        <button
          className="hidden md:block ml-16 bg-gray-900 text-white rounded-sm hover:bg-gray-700 active:scale-[0.97] cursor-pointer transition-all duration-150 ease-out font-semibold px-4 py-2 text-sm focus:outline-none"
          aria-label="Contact"
        >
          <span className="text-sm">Contact</span>
        </button>
      </div>
    </nav>
    <div
      ref={menuRef}
      className={`md:hidden fixed top-16 left-[5%] right-[5%] bg-white border border-gray-300 rounded-md z-40 transition-all duration-200 ease-out will-change-transform ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <ul className="flex flex-col">
        {navItems.map(({ label, submenu }) => (
          <li key={label} className="border-b border-gray-300 last:border-b-0">
            <button
              onClick={() => {
                if (submenu) {
                  setOpenSubmenu(openSubmenu === label ? null : label);
                } else {
                  setIsMobileMenuOpen(false);
                }
              }}
              className="w-full text-left px-4 py-2 text-gray-700 flex justify-between items-center font-medium text-sm transition-all duration-150 ease-out hover:bg-gray-50 active:scale-[0.97]"
            >
              {label}
              {submenu && (
                <MdKeyboardArrowDown className="text-gray-400 text-lg" />
              )}
            </button>
            {submenu && openSubmenu === label && (
              <ul className="bg-gray-50 overflow-hidden">
                {submenu.map((item) => (
                  <li
                    key={item}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-6 py-2 text-gray-600 cursor-pointer text-sm transition-all duration-150 ease-out hover:bg-gray-100 active:scale-[0.97]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 bg-blue rounded-sm cursor-pointer transition-all duration-150 ease-out hover:bg-gray-50 active:scale-[0.97]"
          >
            Contact
          </button>
        </li>
      </ul>
    </div>
    </>
  );
};

export default Navbar;
