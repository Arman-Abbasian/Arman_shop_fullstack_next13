import OTPInput from "react-otp-input";
import { HiArrowNarrowLeft,HiOutlineRefresh,HiOutlineDeviceMobile } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import Loading from "@/common/Loading";
import { BsExclamationTriangle } from "react-icons/bs";

function CheckOTPForm({
  otpResponse,
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  loadingCheckOtp,
}) {
  return (
    <div className="w-full">
      <button onClick={onBack} className="mb-4">
        <HiArrowNarrowLeft className="clickable--icon" />
      </button>
      {/*!-- we rely the show a under block of code to existance of otpResponse */}
      {/* and optResponse in data in useMutation for getOtp mutayion when the code successfully sent to mobile */}
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
          <div>
            <p>the OTP is <span className="text-primary-700">{otpResponse.otpCode}</span></p>
          <div className="flex items-center gap-0.5">
          <BsExclamationTriangle  className="text-warning w-5 h-5"/>
          <p>The OTP code in real websites sent by SMS</p>
          </div>
          <p>{time} second to send new code</p>
            </div>
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
          {loadingCheckOtp ? (
            <button disabled className="btn btn--primary w-full mt-8">
            <Loading width="40" heigh="25" color="rgb(var(--color-primary-100))" />
            </button>
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
