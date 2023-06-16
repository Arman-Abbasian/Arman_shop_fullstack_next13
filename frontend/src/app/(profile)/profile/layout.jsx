import { Roboto } from 'next/font/google'
import "../../globals.css";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import SideBar from "./SideBar";
import roboto from '@/constants/googleFonts';

export const metadata = {
  title: "پروفایل کاربر",
  description: "پروفایل کاربر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={roboto.className}
      >
        <Providers>
          <Toaster />
          <div className="grid grid-cols-5 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <SideBar />
            </div>
            <div className="col-span-4 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
