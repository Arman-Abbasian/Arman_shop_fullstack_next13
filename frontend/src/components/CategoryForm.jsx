import Select from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

export const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];

function CategoryForm({
  onSubmit,
  category,
  handleChange,
  selectedType = "",
  setSelectedType,
  isLoading,
}) {
  return (
    <div className="max-w-sm mb-10">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          name="title"
          label="عنوان"
          value={category.title || ""}
          onChange={handleChange}
        />
        <TextField
          name="englishTitle"
          label="عنوان انگلیسی"
          value={category.englishTitle || ""}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="توضیحات"
          value={category.description || ""}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="type" className="mb-2 block">
            نوع
          </label>
          <Select
            instanceId="type"
            onChange={setSelectedType}
            options={categoryTypes}
            defaultValue={selectedType}
          />
        </div>
        <div className="mt-2">
          {isLoading ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full">تایید</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CategoryForm;
