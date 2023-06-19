"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";

function Header() {
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};

  return (
    <header>
      <nav>
        <ul className="flex items-center  justify-between py-2 container xl:max-w-screen-xl">
          <li>
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
