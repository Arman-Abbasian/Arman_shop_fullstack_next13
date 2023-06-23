"use client"
import { Roboto } from 'next/font/google'
import "../../globals.css";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import SideBar from "./SideBar";
import roboto from '@/constants/googleFonts';
import { useState } from 'react';

import { HiMenu } from "react-icons/hi";


export const metadata = {
  title: "user profile",
  description: "user profile",
};

export default function RootLayout({ children }) {
  const [showMenu,setShawMenu]=useState(false)
  return (
    <html>
      <body
        suppressHydrationWarning={true}
        className={roboto.className}
      >
        <Providers>
          <Toaster />
          <div className="grid lg:grid-cols-5 bg-white lg:h-screen">
          <nav className="py-2 px-4 lg:p-2 shadow-md mb-10 lg:mb-0 sticky top-0 transition-all duration-200 bg-white lg:bg-primary-100 overflow-y-auto">
          <div onClick={()=>setShawMenu(!showMenu)} className="p-2 ring ring-primary-800 rounded-sm inline-block lg:hidden cursor-pointe">
          <HiMenu className="clickable--icon text-primary-900" />
        </div>
        <div className={`${showMenu?'flex':'hidden'} lg:flex`}>
              <SideBar />
        </div>
          </nav>
            
            <div className="lg:col-span-4 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
