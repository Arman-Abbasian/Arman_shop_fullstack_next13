import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className="col-span-1">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}
export default CategorySidebar;
