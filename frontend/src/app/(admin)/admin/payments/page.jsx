"use client";

import Loading from "@/common/Loading";
import { useGetPayments } from "@/hooks/usePayments";
import PaymentListTable from "./PaymentListTable";

function page() {
  const { isLoading, data } = useGetPayments();
  const { payments } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">سفارشات</h1>
      </div>
      <PaymentListTable payments={payments} />
    </div>
  );
}
export default page;
