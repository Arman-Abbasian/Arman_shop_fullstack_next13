"use client";
import { HiOutlineHome,HiOutlineShoppingCart,HiOutlineUser,HiMenu,HiOutlineLogin } from "react-icons/hi";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import http from "@/services/httpService";

function Header() {
  const [showMenu,setShawMenu]=useState(false);
  //! this Query get the user data from Api
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};
  console.log(data)
useEffect(()=>{
  http.get("/user/profile").then(({ data }) => console.log(data))
})
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
          <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
            <Link className="flex lg:justify-center lg:items-center" href="/">
            <HiOutlineHome className="w-6 h-6" />
            </Link>
          </li>
          <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
            <Link className="flex lg:justify-center lg:items-center" href="/products">
              products
            </Link>
          </li>
          <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
            <Link className="flex lg:justify-center lg:items-center" href="/admin">
              admin panel 
            </Link>
          </li>
          <li className="hover:bg-primary-500 p-2 w-44 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
            <Link className="flex lg:justify-center lg:items-center" href="/cart">
              <HiOutlineShoppingCart className="w-6 h-6" />
              <span className="w-4 h-4 bg-red-500 rounded-full flex justify-center items-center text-xs">{cart ? cart.payDetail.productIds.length : 0}</span>
            </Link>
          </li>
          
          {user ? (
            <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
              <Link className="flex lg:justify-center items-center" href="/profile">
            <HiOutlineUser />
            <span>{user.name}</span>
            </Link>
            </li>
          ) : (
            <li className="hover:bg-primary-500 w-44 p-2 rounded-md lg:w-full" onClick={()=>setShawMenu(false)}>
              <Link className="flex lg:justify-center lg:items-center" href="/auth">
              <div className="flex items-center">
            <HiOutlineUser className="icon" />
            <HiOutlineLogin classsName="icon" />
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
