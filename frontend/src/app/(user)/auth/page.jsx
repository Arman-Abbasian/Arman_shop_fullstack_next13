"use client";
import { useEffect, useState } from "react";
import SendOTPFrom from "./SendOTPFrom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import http from "@/services/httpService";
import { RiPhoneCameraFill } from "react-icons/ri";
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
  const { mutateAsync: mutateCheckOtp, isLoading: laodingCheckOtp } = useMutation(
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
      const data = await mutateGetOtp({phoneNumber});
      toast.success(data.message);
      setStep(2);
      setTime(Math.floor((dataGetOtp.expiresIn-Date.now())/1000));
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        document.location.href="/";
      } else {
        router.push("/complete-profile");
      }
      // push -> /complete-profile
      // isActive -> / : /complete-profile
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
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
            laodingCheckOtp={laodingCheckOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
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
