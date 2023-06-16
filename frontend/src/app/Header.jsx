"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

function Header() {
  const { data, error, isLoading } = useGetUser();
  console.log(data,error,isLoading)
  const { user, cart } = data || {};

  return (
    <header
      className={`shadow-md mb-10 sticky top-0 transition-all duration-200 bg-white ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li className="bg-red-500">
            <Link className="block py-2" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              products
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/profile">
              user panel 
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/admin">
              admin panel 
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/cart">
              basket  ({cart ? cart.payDetail.productIds.length : 0})
            </Link>
          </li>
          {user ? (
            <span>{user.name}</span>
          ) : (
            <li>
              <Link className="block py-2" href="/auth">
                enter
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
