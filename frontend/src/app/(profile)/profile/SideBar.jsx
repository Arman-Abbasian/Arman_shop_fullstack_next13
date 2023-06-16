"use client";

import { logout } from "@/services/authServices";
import Link from "next/link";

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
          <Link href="/">صفحه اصلی</Link>
        </li>
        <li>
          <Link href="/profile">داشبورد</Link>
        </li>
        <li>
          <Link href="/profile/me">اطلاعات کاربری</Link>
        </li>
        <li>
          <Link href="/profile/payments">سفارشات </Link>
        </li>
        <li>
          <button onClick={logoutHandler}>خروج از حساب کاربری</button>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
