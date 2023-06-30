import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className="bg-blue-400 ">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}
export default CategorySidebar;
