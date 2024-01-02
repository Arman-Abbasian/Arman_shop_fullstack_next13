"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function AddToCart({ product }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data,isLoading:loadingUseGetUser } = useGetUser();
  const { isLoading, mutateAsync } = useAddToCart();
  const { user } = data || {};

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("please login first");
      router.push("/auth");
      return;
    }

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };
  //! this function check if the product existed in user cart section or not
  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };
  if (loadingUseGetUser) return <button disabled className="btn btn--primary w-full py-2">
  <Loading width="40" heigh="25" color="rgb(var(--color-primary-100))" />
    </button>
  return (
    <div> 
      {isInCart(user, product) ? (
        <Link href="/cart" className="text-primary-900 font-bold w-full">
          continue the order
        </Link>
      ) : (
        isLoading ? 
        <button disabled className="btn btn--primary py-2 w-full">
        <Loading width="40" heigh="25" color="rgb(var(--color-primary-100))" />
          </button> :
          <button onClick={addToCartHandler} className="btn btn--primary py-2 w-full">
          Add
        </button>
        
      )}
    </div>
  );
}
export default AddToCart;
