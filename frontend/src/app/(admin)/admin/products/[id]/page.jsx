"use client";

import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};
  // fetch based on ProductId  to get produt detail

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="mb-4 font-bold text-xl">{product.title}</h1>
    </div>
  );
}
export default page;
