"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

function AddToCart({ product }) {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useAddToCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data } = useGetUser();
const {user}=data||{};

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("please login first");
      router.push("/auth");
      return;
    }
    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      router.refresh(pathname + "?" + searchParams.toString());
      queryClient.invalidateQueries({ queryKey: ["get-user"]});
      
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  //! this function check if the product existed in user cart section or not
  if (product.isPurchased)
  return (
        <Link href="/cart" className="text-primary-900 font-bold w-full">
          continue the order
        </Link>
        )
        if(isLoading)  return(
           <button className="btn btn--primary py-2 w-full">
            <Loading width="40" heigh="25" color="rgb(var(--color-primary-100))" />
            </button>
        )
       return(
            <button onClick={addToCartHandler} className="btn btn--primary py-2 w-full">
            Add
          </button>
          )
}
export default AddToCart;
