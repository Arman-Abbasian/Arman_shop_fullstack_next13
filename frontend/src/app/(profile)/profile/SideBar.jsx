"use client";

import { logout } from "@/services/authServices";
import Link from "next/link";
import { HiOutlineHome, } from "react-icons/hi";

function SideBar() {
  const logoutHandler = async () => {
    await logout();
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("token");
    document.location.href = "/";
  };

  return (
    <div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link href="/"><HiOutlineHome /></Link>
        </li>
        <li>
          <Link href="/profile">dashboard</Link>
        </li>
        <li>
          <Link href="/profile/me">user information</Link>
        </li>
        <li>
          <Link href="/profile/payments">orders</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>log out</button>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
