import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className="bg-primary-200 max-h-screen rounded-md shadow-md">
    <div className="p-4">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
    </div>
  );
}
export default CategorySidebar;
