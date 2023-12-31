import Loading from "@/common/Loading";
import TextField from "@/common/TextField";

function SendOTPFrom({ phoneNumber, onChange, onSubmit, isLoading }) {
  return (
    <div className="flex justify-center items-center w-full">
      <form className="space-y-10 w-full" onSubmit={onSubmit}>
        <TextField
          label="mobile"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isLoading ? (
            <button disabled className="btn btn--primary w-full mt-8">
            <Loading width="40" heigh="25" color="rgb(var(--color-primary-100))" />
            </button>
          ) : (
             <button type="submit" className="btn btn--primary w-full mt-8">
                send code 
             </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default SendOTPFrom;
