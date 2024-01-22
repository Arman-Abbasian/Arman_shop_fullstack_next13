import { getOneProdcutBySlug, getProducts } from "@/services/productService";
import AddToCart from "./AddToCart";
import {
  toNumbersWithComma,
} from "@/utils/toPersianNumbers";

//page is a SSG page
export const dynamic = "force-static"; // SSG or {cache : "force-cache"}
//fallback:false
export const dynamicParams = false; //callback:false

async function page({ params }) {
  const { slug } = params;
  const { product } = await getOneProdcutBySlug(slug);
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
       {/* product pictures */}
      <div class="aspect-w-16 aspect-h-9 lg:aspect-h-4 flex-1 flex justify-start items-start bg-primary-900 rounded-md">
        <img src={product.imageLink} alt={product.title} class="w-full h-full object-center object-contain" />
      </div>
      {/* product information */}
      <div className="flex-1">
      <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
      <p className="mb-6">{product.description}</p>
      <p className="mb-6">
        product cost  :{" "}
        <span className={`${product.discount ? "line-through" : "font-bold"}`}>
          {toNumbersWithComma(product.price)}
        </span>
      </p>
      {!!product.discount && (
        <div className="flex items-center gap-x-2 mb-6">
          <p className="text-xl font-bold">
          discounted price: {toNumbersWithComma(product.offPrice)}
          </p>
          <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
            {product.discount } %
          </div>
        </div>
      )}
      <AddToCart product={product} />
      </div>
    </div>
  );
}
export default page;

//! this section means how many page must built

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
