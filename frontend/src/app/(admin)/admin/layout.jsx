import { Roboto } from "next/font/google";
import "../../globals.css";
import Providers from "@/pages/Providers";
import { Toaster } from "react-hot-toast";
import AdminSideBar from "./AdminSideBar";
import roboto from "@/constants/googleFonts";

// export const metadata = {
//   title: "admin profile",
//   description: "admin profile",
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <Providers>
          <Toaster />
          <div className="lg:grid lg:grid-cols-5 bg-white h-screen">
            <div className="lg:col-span-1 overflow-y-auto ">
              <AdminSideBar />
            </div>
            <div className="lg:col-span-4 overflow-y-auto p-2">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
