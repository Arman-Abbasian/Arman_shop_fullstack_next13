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
  const includeskey = ["name", "email", "biography"];
  useEffect(() => {
    if (user) setFormData(includeObj(user, includeskey));
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //! form validation fron frontend
      if(formData.name.length===0){
        toast.error("please enter your name")
        return false
      }else if(formData.name.length<2){
        toast.error ("name is too short")
        return false
      }else if(formData.name.length>50){
        toast.error ("name is too long")
        return false
      }
      if(!formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
        toast.error("email address is not true")
        return false;
      }
      if(formData.biography.length>50){
        toast.error("biography is too large")
        return false
        }
      const { message } = await updateUserInformationQuery(formData);
      //! make the "get-user" Query invalid to refetch this query and update the new data
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
      <form onSubmit={submitHandler} className="space-y-5">
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
