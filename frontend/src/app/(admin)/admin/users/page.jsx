"use client";

import Loading from "@/common/Loading";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { isLoading, data } = useGetUsers();
  const { users } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}
export default UsersPage;
