import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className="bg-primary-900 h-[calc(100vh-10rem)] rounded-md shadow-md text-white">
    <div className="p-4">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
    </div>
  );
}
export default CategorySidebar;
