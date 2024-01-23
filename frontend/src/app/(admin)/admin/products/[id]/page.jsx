"use client";

import Loading from "@/common/Loading";
import { dateFormatOptions } from "@/constants/dateFormatOption";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};
  // fetch based on ProductId  to get produt detail
  if (isLoading) return <Loading />;
  return <div className="space-y-7"> 
  <h1 className="font-bold text-xl text-primary-800">Product</h1>
  <p><span className="font-bold">name: </span>{product.title}</p>
  <p><span className="font-bold">description: </span>{product.description}</p>
  <p><span className="font-bold">product slug: </span>{product.slug}</p>
  <p><span className="font-bold">price: </span>{product.price}</p>
  <p><span className="font-bold">discount: </span>{product.discount}</p>
  <p><span className="font-bold">final price: </span>{product.offPrice}</p>
  <p><span className="font-bold">brand: </span>{product.brand}</p>
  <p><span className="font-bold">num of likes: </span>{product.numOfLikes}</p>
  <p><span className="font-bold">latest version: </span>{new Date(product.updatedAt).toLocaleDateString("en-US",dateFormatOptions)}</p>
</div>;
}
export default page;
