"use client";
import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { completeProfile } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CompleteProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isLoading, mutateAsync:mutateCompleteProfile } = useMutation({
    mutationFn: completeProfile,
  });
  const router = useRouter();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateCompleteProfile({ name, email });
      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            name="name"
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="email"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {isLoading ? (
              <Loading />
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CompleteProfile;
