import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
}) {
  return (
    <div className="max-w-sm">
      <form className="space-y-4" onSubmit={onSubmit}>
        <TextField
          label="کد"
          name="code"
          value={formData.code || ""}
          onChange={onFormChange}
        />
        <TextField
          label="مقدار"
          name="amount"
          value={formData.amount || ""}
          onChange={onFormChange}
        />
        <TextField
          label="ظرفیت"
          name="usageLimit"
          value={formData.usageLimit || ""}
          onChange={onFormChange}
        />
        <div>
          <span className="mb-2 block">نوع کد تخفیف</span>
          <div className="flex items-center justify-between">
            <RadioInput
              checked={type === "percent"}
              id="percent-type"
              name="type"
              label="درصد"
              value="percent"
              onChange={(e) => setType(e.target.value)}
            />
            <RadioInput
              checked={type === "fixedProduct"}
              id="fixedProduct-type"
              name="type"
              label="قیمت ثابت"
              value="fixedProduct"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="products" className="mb-2 block">
            شامل محصولات
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
          <span className="mb-2 block">تاریخ انقضا</span>
          <DatePicker
            inputClass="textField__input w-[330px]"
            value={expireDate}
            format="YYYY/MM/DD"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-left"
            onChange={(date) => setExpireDate(date)}
          />
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button className="btn btn--primary w-full"> تایید</button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CouponForm;
