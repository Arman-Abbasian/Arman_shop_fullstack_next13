"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import PaymentTable from "./payments/PaymentTable";
import Link from "next/link";

function Profile() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">
      welcome <span className="font-bold">{user.name}</span> 
      </h1>
      <p>
        <span>join date:</span>
        <span> {toLocalDateString(user.createdAt)} </span>
      </p>
      <div className="border rounded-xl  mt-8">
      <h2 className="font-bold text-xl">latest orders</h2>
        <div className="p-4 flex items-center justify-between">
          <Link className="text-primary-900 font-bold" href="/profile/payments">
           All orders
          </Link>
        </div>
        {/* show the 3 last orders of user */}
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}
export default Profile;
