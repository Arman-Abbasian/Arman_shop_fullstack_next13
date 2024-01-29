import Select from "react-select";
import { TagsInput } from "react-tag-input-component";
import Loading from "@/common/Loading";
import TextField from "@/common/TextField";

const productsFormData = [
  {
    id: 1,
    label: "title",
    name: "title",
  },
  {
    id: 2,
    label: "description",
    name: "description",
  },
  {
    id: 3,
    label: "slug",
    name: "slug",
  },
  {
    id: 4,
    label: "brand",
    name: "brand",
  },
  {
    id: 5,
    label: "price",
    name: "price",
  },
  {
    id: 6,
    label: "discount",
    name: "discount",
  },
  {
    id: 7,
    label: "offPrice",
    name: "offPrice",
  },
  {
    id: 8,
    label: "countInStock",
    name: "countInStock",
  },
  {
    id: 9,
    label: "imageLink",
    name: "imageLink",
  },
];

function ProductForm({
  onSubmit,
  tags,
  setTags,
  productData,
  productDataOnChange,
  categories,
  setSelectedCategory,
  isLoading,
  selectedCategory = "",
  buttonText
}) {
  return (
    <div className="max-w-sm">
      <form className="space-y-4" onSubmit={onSubmit}>
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={productData[item.name] ?? ""}
              onChange={productDataOnChange}
            />
          );
        })}
        <div>
          <label className="mb-2 block" htmlFor="tags">
            tags
          </label>
          <TagsInput id="tags" value={tags} onChange={setTags} name="tags" />
        </div>
        <div>
          <label htmlFor="category" className="mb-2 block">
           category
          </label>
          <Select
            id="category"
            onChange={setSelectedCategory}
            options={categories}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={selectedCategory}
          />
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full">{buttonText}</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default ProductForm;
