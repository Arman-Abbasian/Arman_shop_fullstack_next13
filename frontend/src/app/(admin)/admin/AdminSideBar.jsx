"use client";

import { logout } from "@/services/authServices";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

function AdminSideBar() {
  const [showMenu,setShowMenu]=useState(false);
  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  return (
    <div>
      <div onClick={()=>setShowMenu(!showMenu)} className="p-2 ring ring-primary-800 rounded-sm inline-block lg:hidden cursor-pointer">
          <HiMenu className="w-6 h-6 text-primary-900" />
        </div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link href="/">صفحه اصلی</Link>
        </li>
        <li>
          <Link href="/admin">داشبورد</Link>
        </li>
        <li>
          <Link href="/admin/users">کاربران</Link>
        </li>
        <li>
          <Link href="/admin/products">محصولات</Link>
        </li>
        <li>
          <Link href="/admin/categories">دسته بندی</Link>
        </li>
        <li>
          <Link href="/admin/payments">سفارشات </Link>
        </li>
        <li>
          <Link href="/admin/coupons">کد تخفیف</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>خروج از حساب کاربری</button>
        </li>
      </ul>
    </div>
  );
}
export default AdminSideBar;
