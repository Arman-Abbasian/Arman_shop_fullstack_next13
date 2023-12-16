"use client";
import { useEffect, useState } from "react";
import SendOTPFrom from "./SendOTPFrom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp,getOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();
  const {
    data: dataGetOtp,
    error:errorGetOtp,
    isLoading:laodingGetOtp,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp, isLoading: loadingCheckOtp,error } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      if(!phoneNumber.match(/^09[0-9]{9}$/)) {
        toast.error("phone number is not valid")
        return false
      }
      const data = await mutateGetOtp({phoneNumber});
      toast.success(data.message);
      setStep(2);
      setTime(Math.floor((data.expiresIn-Date.now())/1000));
      //!when user click on send button and send a phone number we clean the otp state
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      if(!phoneNumber.match(/^09[0-9]{9}/)){
        toast.error("phone number is not valid")
        return false
      }
      if(!otp.match(/[0-9]{6}/)){
        toast.error("OTP is not valid")
        return false
      }
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      //if the user is Active (have email and username)
      if (user.isActive) {
        document.location.href="/";
      } else {
        //if the user is not Active (do not have email and username)
        router.push("/complete-profile");
      }
      // push -> /complete-profile
      // isActive -> / : /complete-profile
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  //!this useEffect is for managing the OTP timer
  useEffect(() => {
    //make a timer
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    //this section is clear interval
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPFrom
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isLoading={laodingGetOtp}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={dataGetOtp}
            loadingCheckOtp={loadingCheckOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md flex justify-center items-center">{renderSteps()}</div>
    </div>
  );
}
export default AuthPage;

//? TASK #1 : auth user using OTP :

//1. form -> getOTP -> input + button => phoneNumber => send OTP
// input => TextField
// 2. form -> checkOTP ->
// request => ?
//* 1. axios (useState + useEffect),
//* 2. useFetch (data, loading, error),
//* 3. react-query ->  redux alternative (state management) + fetch , mutate !
