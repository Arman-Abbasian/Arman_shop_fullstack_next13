"use client";
import { HiOutlineHome,HiOutlineShoppingCart,HiOutlineUser,HiMenu } from "react-icons/hi";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [showMenu,setShawMenu]=useState(false);
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};
  console.log(error)

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav className="py-2 px-4 lg:p-2">
        <div onClick={()=>setShawMenu(!showMenu)} className="p-2 ring ring-primary-800 rounded-sm inline-block lg:hidden cursor-pointer">
          <HiMenu className="w-6 h-6 text-primary-900" />
        </div>
        <ul className={`${showMenu?'flex':'hidden'} lg:flex flex-col lg:flex-row lg:items-center  lg:justify-between container lg:p-2 max-w-screen-xl`}>
          <li className="hover:bg-primary-200 w-44  rounded-md lg:w-full">
            <Link className="block p-2" href="/">
            <HiOutlineHome className="w-6 h-6" />
            </Link>
          </li>
          <li className="hover:bg-primary-200 w-44 p-2 rounded-md lg:w-full">
            <Link className="block" href="/products">
              products
            </Link>
          </li>
          <li className="hover:bg-primary-200 w-44 p-2 rounded-md lg:w-full">
            <Link className="block" href="/admin">
              admin panel 
            </Link>
          </li>
          <li className="hover:bg-primary-200 p-2 w-44 rounded-md lg:w-full">
            <Link className="flex  -space-x-0" href="/cart">
              <HiOutlineShoppingCart className="w-6 h-6" />
              <span className="w-4 h-4 bg-red-500 rounded-full flex justify-center items-center text-xs">{cart ? cart.payDetail.productIds.length : 0}</span>
            </Link>
          </li>
          
          {user ? (
            <li className="hover:bg-primary-200 w-44 p-2 rounded-md lg:w-full">
              <Link className="flex items-center gap-1  py-2" href="/profile">
            <HiOutlineUser />
            <span>{user.name}</span>
            </Link>
            </li>
          ) : (
            <li className="hover:bg-primary-200 w-44 p-2 rounded-md lg:w-full">
              <Link className="flex" href="/auth">
              <div className="flex items-center gap-1">
            <HiOutlineUser />
            <span>enter</span>
            </div> 
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
