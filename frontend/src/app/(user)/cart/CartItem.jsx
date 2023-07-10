"use client";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import {
  toNumbersWithComma,
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { HiOutlineTrash, HiPlus, HiMinus } from "react-icons/hi";

function CartItem({ cartItem }) {
  const { isLoading, mutateAsync: addToCarAsync } = useAddToCart();
  const { mutateAsync: decFromCartAsync } = useDecrementFromCart();
  const queryClient = useQueryClient();

  const addToCartHandler = async () => {
    try {
      const { message } = await addToCarAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const decrementHandler = async () => {
    try {
      const { message } = await decFromCartAsync(cartItem._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="border rounded-xl p-4 flex justify-between flex-nowrap overflow-x-scroll gap-4 w-[600]">
      <div className="font-bold flex flex-nowrap justify-center items-center">
      <p>{cartItem.title}</p>
      </div>
        <div className="justify-center items-center">
          <div className="flex flex-nowrap">
            cost :{" "}
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {toNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2 flex-nowrap">
              <p className="font-bold">
                {" "}
                {toNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(cartItem.discount)}%
              </div>
            </div>
          )}
        </div>

        <div className="border-r-2 pr-2 flex justify-center items-center flex-nowrap gap-1">
          <span>number:</span>
          <span>{cartItem.quantity}</span>
        </div>
        <div className="flex flex-nowrap justify-center items-center gap-x-3 ">
          <button
            onClick={addToCartHandler}
            className="bg-primary-900 text-white rounded p-1 w-8 h-8 flex justify-center items-center"
          >
            <HiPlus className="w-4 h-4" />
          </button>
          <button onClick={decrementHandler} className="border rounded p-1 w-8 h-8 flex justify-center items-center">
            {cartItem.quantity > 1 ? (
              <HiMinus className="w-4 h-4" />
            ) : (
              <HiOutlineTrash className=" text-rose-500 w-6 h-6" />
            )}
          </button>
        </div>
      </div>
  );
}
export default CartItem;
