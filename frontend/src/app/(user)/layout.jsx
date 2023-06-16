import { Roboto } from 'next/font/google'
import "../globals.css";
import Header from "../Header";
import { Toaster } from "react-hot-toast";
import Providers from "../Providers";
import roboto from '@/constants/googleFonts';

export const metadata = {
  title: "Next Shop Panel",
  description: "Next.js Course Fronthooks Course",
};
export default function RootLayout({ children }) {
  return (
    <html>
      <body
        suppressHydrationWarning={true}
        className={roboto.className}
      >
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
