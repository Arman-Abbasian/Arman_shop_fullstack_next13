"use client";

import Loading from "@/common/Loading";
import { useGetOnePayment } from "@/hooks/usePayments";
import { toLocalDateString } from "@/utils/toLocalDate";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const {data,isLoading}=useGetOnePayment(id)
  const {payment}=data||{}
  if(isLoading) return <Loading />
  
  const paymentt=payment[0]
  console.log(paymentt)
  const paymentDate=toLocalDateString(paymentt.createdAt)
  return <div className="space-y-8">
    <p><strong>invoice number :</strong> {paymentt.invoiceNumber}</p>
    <p><strong>payment method :</strong> {paymentt.paymentMethod}</p>
    <p><strong>payment date :</strong>{paymentDate}</p>
    <p><strong>status :</strong> <span className={`${paymentt.status=="COMPLETED"&& 'text-success'}`}>{paymentt.status.toLocaleLowerCase()}</span></p>
    <div className="flex flex-wrap items-center gap-1">
    <strong>user :</strong> 
    <p className="badge badge--secondary">{paymentt.user.name}</p>
    <p className="badge badge--secondary">{paymentt.user.email}</p>
    <p className="badge badge--secondary">{paymentt.user.phoneNumber}</p>
    </div>
    <p><strong>paied price :</strong> {paymentt.amount}</p>
    <p><strong>products :</strong> </p>
    <div className="flex flex-wrap items-center gap-3">{paymentt.cart.productDetail.map((item)=>(
      <div className="flex gap-4 w-80 h-16 overflow-auto border border-primary-900 shadow-md rounded-md">
      <div >
      <img src={item.imageLink} alt={item.title} className="max-w-full max-h-full object-cover" />
    </div>
    <div className="flex flex-col gap-2">
    <p>{item.title}</p>
    <p>{item.slug}</p>
    </div>
    </div>
    ))}
    </div>
  </div>;
}
export default page;
