"use client";

import { logout } from "@/services/authServices";
import Link from "next/link";
import { HiOutlineHome,HiOutlineLogout } from "react-icons/hi";

function SideBar({setShowMenu}) {
  const logoutHandler = async () => {
    await logout();
    //! in real apps you should delete all the localStorages also
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("token");
    //! back to the home page with a full refresh
    document.location.href = "/";
  };

  return (
    <div className="w-full">
      <ul className="flex flex-col space-y-2">
        <li className="hover:bg-primary-400 w-52 p-2 rounded-md lg:w-full" onClick={()=>setShowMenu(false)}>
          <Link href="/"><HiOutlineHome className="icon" /></Link>
        </li>
        <li className="hover:bg-primary-400 w-52 p-2 rounded-md lg:w-full" onClick={()=>setShowMenu(false)}>
          <Link href="/profile" className="block">dashboard</Link>
        </li>
        <li className="hover:bg-primary-400 w-52 p-2 rounded-md lg:w-full " onClick={()=>setShowMenu(false)}>
          <Link href="/profile/me" className="block">user information</Link>
        </li>
        <li className="hover:bg-primary-400 w-52 p-2 rounded-md lg:w-full" onClick={()=>setShowMenu(false)}>
          <Link href="/profile/payments" className="block">orders</Link>
        </li>
        <li className="hover:bg-primary-400 w-52  p-2 rounded-md lg:w-full" onClick={()=>setShowMenu(false)}>
          <button onClick={logoutHandler} className="block w-full"><HiOutlineLogout className="icon" /></button>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
