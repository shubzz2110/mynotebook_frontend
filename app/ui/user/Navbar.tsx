"use client";

import React, { useRef, useState } from "react";
import {
  Bell,
  BookOpenIcon,
  CogIcon,
  Home,
  Lock,
  LogOut,
  Notebook,
  User,
} from "lucide-react";
import { MenuProp } from "@/app/lib/definitions";
import MenuPopup from "../MenuPopup";
import api from "@/app/lib/axios";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  // Stores and routes
  const router = useRouter();
  const pathname = usePathname();

  // Menu pop up states and refs
  const [showMenuPopUp, setShowMenuPopUp] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, right: 0 });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Menu items to be passed as props
  const menuItems: MenuProp[] = [
    {
      icon: <User />,
      label: "Profile",
      onClick: () => {
        console.log("Profile");
      },
    },
    {
      icon: <Lock size={20} />,
      label: "Change Password",
      onClick: () => {
        console.log("change password");
      },
    },
    {
      icon: <CogIcon size={20} />,
      label: "Settings",
      onClick: () => {
        console.log("settings");
      },
    },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];
  const navMenuItems: MenuProp[] = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      onClick: () => router.push("/user/dashboard"),
    },
    {
      icon: <Notebook size={20} />,
      label: "Notes",
      onClick: () => router.push("/user/notes"),
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      onClick: () => router.push("/user/profile"),
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      onClick: () => router.push("/user/notifications"),
    },
  ];
  const handleToggleMenu = () => {
    let rect;
    if (imgRef.current) {
      rect = imgRef.current.getBoundingClientRect();
    } else if (buttonRef.current) {
      rect = buttonRef.current.getBoundingClientRect();
    }

    if (rect) {
      setPopupPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setShowMenuPopUp(!showMenuPopUp);
  };

  const handleLogout = async () => {
    try {
      await api.post("/accounts/logout/");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="flex items-center justify-between w-full h-max bg-surface-50 border border-surface-200 rounded-[15px] p-2">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center min-w-10 min-h-10 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
          <BookOpenIcon className="text-white" size={24} />
        </div>
        <h1 className="text-surface-900 font-bold text-xl pr-2.5">
          MyNotebook
        </h1>
        <div className="flex">
          {navMenuItems.map((navItem) => (
            <button
              key={navItem.label}
              onClick={() => navItem.onClick()}
              className={clsx(
                `px-5 py-2.5 flex items-center gap-2.5 text-surface-700 font-normal text-sm leading-4 cursor-pointer rounded-[15px]`,
                {
                  "bg-gradient-to-r from-blue-500 to-indigo-600 text-white":
                    pathname.includes(navItem.label.toLowerCase()),
                }
              )}
            >
              {navItem.icon}
              <h1>{navItem.label}</h1>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <h1 className="text-surface-700 font-normal text-sm leading-4">
          Welcome back, Shubham!
        </h1>
        <button
          ref={buttonRef}
          onClick={handleToggleMenu}
          className="cursor-pointer min-w-10 min-h-10 h-10 w-10 flex items-center justify-center rounded-full bg-surface-300 border-surface-200"
        >
          <User size={20} className="text-surface-700" />
        </button>
      </div>
      {showMenuPopUp && (
        <MenuPopup
          onClose={() => setShowMenuPopUp(false)}
          position={popupPosition}
          items={menuItems}
        />
      )}
    </nav>
  );
}
