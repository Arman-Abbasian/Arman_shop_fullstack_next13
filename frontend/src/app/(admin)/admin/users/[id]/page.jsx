"use client";

import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  // get user data based on Id =>
  console.log(id);
  return <div>page</div>;
}
export default page;
