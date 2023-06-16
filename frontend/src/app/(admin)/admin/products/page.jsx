"use client";

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductListTable from "./ProductListTable";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";

function page() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">محصولات</h1>
        <Link
          href="/admin/products/add"
          className="font-bold text-primary-900 flex items-center gap-x-2"
        >
          <HiPlusCircle className="w-6 h-6" /> <span>اضافه کردن محصول</span>
        </Link>
      </div>
      <ProductListTable products={products} />
    </div>
  );
}
export default page;

// add
// edit (update)
// remove (delete)
//  /admin/products/add (add)
// /admin/products/active()
