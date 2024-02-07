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
    <nav className="p-3 lg:p-0">
      <div onClick={()=>setShowMenu(!showMenu)} className="p-2 ring ring-primary-800 rounded-sm inline-block mb-2  lg:hidden cursor-pointer">
          <HiMenu className="w-6 h-6 text-primary-900" />
      </div>
      <ul className={`${showMenu?'flex':'hidden'}  lg:flex flex-col p-2 gap-5 bg-secondary-300 lg:h-screen rounded-md lg:rounded-none`}>
        
          <Link onClick={()=>setShowMenu(false)} href="/" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li>Home</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >dashboard</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin/users" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >users</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin/products" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >products</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin/categories" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >categories</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin/payments" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >payments</li>
          </Link>
          <Link onClick={()=>setShowMenu(false)} href="/admin/coupons" className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <li >discount code</li>
          </Link>
        <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full">
          <button onClick={logoutHandler}>log out</button>
        </li>
      </ul>
    </nav>
  );
}
export default AdminSideBar;
