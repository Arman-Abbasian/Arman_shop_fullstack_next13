import OTPInput from "react-otp-input";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import Loading from "@/common/Loading";
function CheckOTPForm({
  otpResponse,
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  isCechkingOtp,
}) {
  return (
    <div>
      <button onClick={onBack} className="mb-4">
        <HiArrowNarrowLeft className="w-6 h-6 text-secondary-500" />
      </button>
      {otpResponse && (
       <div>
         <p className="text-success">{otpResponse?.message}</p>
        <div className="flex items-center gap-4">
          <p>edit phone number</p>
          <CiEdit onClick={onBack} className="w-6 h-6 text-primary-900 cursor-pointer" />
        </div>
        </div>
      )}
      <div className="mb-4 text-secondary-500">
        {time > 0 ? (
          <p>{time} second to send new code</p>
        ) : (
          <button onClick={onResendOtp}>resend conde ?</button>
        )}
      </div>

      <form className="space-y-10" onSubmit={onSubmit}>
        <p className="font-bold">Enter the code</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
          }}
          containerStyle="flex gap-x-2 justify-center"
          renderInput={(props) => <input type="number" {...props} />}
        />
        <div>
          {isCechkingOtp ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default CheckOTPForm;
