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
//under line said that this page is a SSR page
export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function Products({ searchParams }) {
  // const { products } = await getProducts(queryString.stringify(searchParams));
  // const { categories } = await getCategories();
  //get cookies in SSR components
  const cookieStore = cookies();
  //change cookies to string for use in http methods
  const strCookies = toStringCookies(cookieStore);
  // get all products request with two factor : 1-query strings, 2-cookies
  const productsPromise = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const categoryPromise = getCategories();
  //parallel data fetching method
  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);
  
  return (
    <div>
      <div className="flex gap-4">
        <CategorySidebar categories={categories} />
        <div className="flex-1">
          <div className="flex justify-center lg:justify-start items-center flex-wrap  gap-4">
            {products.map((product) => {
              return (
                <div
                  className="w-72 rounded-xl shadow-lg p-4 shadow-primary-400"
                  key={product._id}
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img src="images/santoor.png" alt="santoor" class="w-full h-full object-center object-contain" />
                  </div>
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
