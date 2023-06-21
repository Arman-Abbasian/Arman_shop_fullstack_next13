"use client";
import { HiOutlineHome,HiOutlineShoppingCart,HiOutlineUser } from "react-icons/hi";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

function Header() {
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
            <HiOutlineHome />
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              products
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/admin">
              admin panel 
            </Link>
          </li>
          <li>
            <Link className="flex py-2 -space-x-0" href="/cart">
              <HiOutlineShoppingCart />
              <span className="w-4 h-4 bg-red-500 rounded-full flex justify-center items-center text-xs">{cart ? cart.payDetail.productIds.length : 0}</span>
            </Link>
          </li>
          
          {user ? (
            <li>
              <Link className="flex items-center gap-1  py-2" href="/profile">
            <HiOutlineUser />
            <span>{user.name}</span>
            </Link>
            </li>
          ) : (
            <li>
              <Link className="flex py-2" href="/auth">
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
