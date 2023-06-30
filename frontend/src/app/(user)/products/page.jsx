import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import Link from "next/link";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function Products({ searchParams }) {
  // const { products } = await getProducts(queryString.stringify(searchParams));
  // const { categories } = await getCategories();
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );

  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  return (
    <div>
      <div className="flex items-center gap-4">
        <CategorySidebar categories={categories} />
        <div className="bg-red-300 flex-1">
          <div className="flex flex-wrap  gap-4">
            {products.map((product) => {
              return (
                <div
                  className="border w-64 rounded-xl shadow-md p-4"
                  key={product._id}
                >
                  <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                  <div className="mb-4 flex gap-2 items-center">
                    <span>Date: </span>
                    <span className="font-bold">
                      {toLocalDateStringShort(product.createdAt)}
                    </span>
                  </div>
                  <Link
                    className="text-primary-900 font-bold mb-4 block"
                    href={`/products/${product.slug}`}
                  >
                 product details
                  </Link>
                  <LikeProduct product={product} />
                  <AddToCart product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
