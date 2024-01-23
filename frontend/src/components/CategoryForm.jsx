import Select from "react-select";
import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

export const categoryTypes = [
  {
    id: 1,
    label: "product",
    value: "product",
  },
  {
    id: 2,
    label: "post",
    value: "post",
  },
  {
    id: 3,
    label: "ticket",
    value: "ticket",
  },
  {
    id: 4,
    label: "comment",
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
  submitButtonTitle,
}) {
  return (
    <div className="max-w-sm mb-10">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          name="title"
          label="title"
          value={category.title || ""}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="description"
          value={category.description || ""}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="type" className="mb-2 block">
            type
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
            <button className="btn btn--primary w-full">{submitButtonTitle}</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CategoryForm;
