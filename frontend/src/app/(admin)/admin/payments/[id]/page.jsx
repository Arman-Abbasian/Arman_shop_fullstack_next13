"use client";

import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  // ...
  return <div>page</div>;
}
export default page;
