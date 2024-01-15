"use client";

import { useGetUserByParam } from "@/hooks/useAuth";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const {data,isLoading,error,isError}=useGetUserByParam({userId:id})
  console.log({data,isLoading,error,isError})
  // get user data based on Id =>
  console.log(id);
  return <div>page</div>;
}
export default page;
