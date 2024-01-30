import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import Loading from "@/common/Loading";

function CouponForm({
  formData,
  onSubmit,
  onFormChange,
  type,
  setType,
  options,
  onChangeSelect,
  expireDate,
  setExpireDate,
  isLoading,
  defaultValue = "",
  buttonText
}) {
  return (
    <div className="max-w-sm">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          label="code"
          name="code"
          value={formData.code || ""}
          onChange={onFormChange}
        />
        <TextField
          label="discount amount"
          name="amount"
          value={formData.amount || ""}
          onChange={onFormChange}
        />
        <TextField
          label="capacity"
          name="usageLimit"
          value={formData.usageLimit || ""}
          onChange={onFormChange}
        />
        <div>
          <span className="mb-2 block">type</span>
          <div className="flex items-center justify-between">
            <RadioInput
              checked={type === "percent"}
              id="percent-type"
              name="type"
              label="percent"
              value="percent"
              onChange={(e) => setType(e.target.value)}
            />
            <RadioInput
              checked={type === "fixedProduct"}
              id="fixedProduct-type"
              name="type"
              label="fixed price"
              value="fixedProduct"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="products" className="mb-2 block">
             applied products
          </label>
          <Select
            instanceId="products"
            isMulti
            onChange={onChangeSelect}
            options={options}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={defaultValue}
          />
        </div>
        <div>
          <span className="mb-2 block">expire date</span>
          <DatePicker
            inputClass="textField__input w-full"
            value={expireDate}
            format="YYYY/MM/DD"
            calendarPosition="bottom-left"
            onChange={(date) => setExpireDate(date)}
            containerStyle={{width:"100%"}}
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
export default CouponForm;
