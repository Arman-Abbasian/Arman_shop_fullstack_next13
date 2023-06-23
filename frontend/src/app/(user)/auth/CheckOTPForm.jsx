import OTPInput from "react-otp-input";
import { HiArrowNarrowLeft,HiOutlineRefresh,HiOutlineDeviceMobile } from "react-icons/hi";
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
  laodingCheckOtp,
}) {
  console.log(time)
  return (
    <div className="w-full">
      <button onClick={onBack} className="mb-4">
        <HiArrowNarrowLeft className="clickable--icon" />
      </button>
      {otpResponse && (
       <div>
         <p className="mb-4">{otpResponse?.message}</p>
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineDeviceMobile className="icon" />
          <CiEdit onClick={onBack} className="clickable--icon" />
        </div>
        </div>
      )}
      <div className="text-secondary-500 mb-4">
        {time > 0 ? (
          <p>{time} second to send new code</p>
        ) : (
          <button onClick={onResendOtp}><HiOutlineRefresh className="clickable--icon" /></button>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <p className="font-bold mb-2">Enter the code</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span></span>}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "2px solid rgb(var(--color-primary-500))",
            borderRadius: "0.5rem",
            marginBottom:"60px",
          }}
          containerStyle="flex gap-x-2 justify-center"
          renderInput={(props) => <input type="number" {...props} />}
        />
        <div>
          {laodingCheckOtp ? (
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
