import "../globals.css";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";
import roboto from "@/constants/googleFonts";

// export const metadata = {
//   title: "Arman Shop Panel",
//   description: "user section",
// };
export default function RootLayout({ children }) {
  return (
    <html>
      <body
        suppressHydrationWarning={true}
        //add font to this layout
        className={roboto.className}
      >
        {/* add react-query to all pages of this layout */}
        <Providers>
          {/* add react-hot-toast to all pages of this layout */}
          <Toaster />
          <div className="h-screen flex flex-col">
            <Header />
            <div className="container mx-auto max-w-screen-xl p-4 flex-grow pt-16 lg:pt-0">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
