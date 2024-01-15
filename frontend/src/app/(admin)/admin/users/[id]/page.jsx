"use client";

import Loading from "@/common/Loading";
import { useGetUserByParam } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircleOutline,IoMdCloseCircleOutline ,IoMdPerson  } from "react-icons/io";

const options={
  year: "numeric",
  month: "short",
  day: "numeric",
}

function page() {
  const { id } = useParams();
  const {data,isLoading,error,isError}=useGetUserByParam({userId:id})
 if (isLoading)  return <Loading width="100" heigh="60" />
 if(error){
  toast.error(error?.response?.data?.message)
  return
 }
  // get user data based on Id =>
  return <div className="space-y-7"> 
    <div><IoMdPerson className="text-primary-900 w-9 h-9" /></div>
    <p><span className="font-bold">name: </span>{data.user.name}</p>
    <p><span className="font-bold">phone number: </span>{data.user.phoneNumber}</p>
    <p><span className="font-bold">email: </span>{data.user.email}</p>
    <p><span className="font-bold">role: </span>{data.user.role}</p>
    <p><span className="font-bold">biography: </span>{data.user.biography}</p>
    <p className="flex items-center gap-0.5"><span className="font-bold">verified phone number: 
    </span>{data.user.isVerifiedPhoneNumber ?<IoIosCheckmarkCircleOutline className="w-6 h-6 text-green-900"/>:<IoMdCloseCircleOutline className="w-6 h-6 text-red-900"/>}</p>
    <p><span className="font-bold">join at: </span>{new Date(data.user.createdAt).toLocaleDateString("en-US",options)}</p>
    <div>
    <p className="font-bold">products:</p>
      {data.user.Products.map(Product=>{
        return <p key={Product._id}>{Product.title}</p>
      })}
    </div>
  </div>;
}
export default page;
