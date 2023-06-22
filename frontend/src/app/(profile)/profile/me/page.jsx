"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfile } from "@/services/authServices";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function MePage() {
  const { data:userData, isLoading:userDataLoading } = useGetUser();
  const { isLoading: isUpdating, mutateAsync:updateUserInformationQuery } = useMutation({
    mutationFn: updateProfile,
  });
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({});
  const { user } = userData || {};
  const includeskey = ["name", "email", "phoneNumber", "biography"];
  useEffect(() => {
    if (user) setFormData(includeObj(user, includeskey));
  }, [user]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateUserInformationQuery(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  if (userDataLoading) return <Loading />;
  return (
    <div className="container mx-auto max-w-sm">
      <h1 className="text-xl font-bold mb-4">user information</h1>
      <form onSubmit={sumbitHandler} className="space-y-5">
        {Object.keys(includeObj(user, includeskey)).map((key) => {
          return (
            <TextField
              label={key}
              name={key}
              key={key}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
        <div className="pt-2">
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              update
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default MePage;
