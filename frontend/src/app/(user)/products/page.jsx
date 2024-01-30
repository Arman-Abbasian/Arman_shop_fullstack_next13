import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringCookies";
import Product from "./Product";
//!under line said that this page is a SSR page
export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir. :)

async function Products({ searchParams }) {
  // const { products } = await getProducts(queryString.stringify(searchParams));
  // const { categories } = await getCategories();
  //!get cookies in SSR components
  const cookieStore = cookies();
  //!change cookies to string for use in http methods
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
  console.log(products)
  
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <CategorySidebar categories={categories} />
        <div className="flex-1">
          <div className="flex justify-center lg:justify-start items-center flex-wrap  gap-4">
            {products.map((product) => {
              return (
                <Product product={product}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Products;
