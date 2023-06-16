"use client";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import {
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
    <div className="border rounded-xl p-4 flex justify-between">
      <span className="flex-1 font-bold">{cartItem.title}</span>
      <div className="flex items-center justify-between  gap-x-8 flex-1">
        <div>
          <div>
            قیمت :{" "}
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold">
                {" "}
                {toPersianNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>

        <span className="border-r-2 pr-2">
          تعداد : {toPersianNumbers(cartItem.quantity)}
        </span>
        <div className="flex gap-x-3">
          <button
            onClick={addToCartHandler}
            className="bg-primary-900 text-white rounded p-1"
          >
            <HiPlus className="w-4 h-4" />
          </button>
          <button onClick={decrementHandler} className="border rounded p-1">
            {cartItem.quantity > 1 ? (
              <HiMinus className="w-4 h-4" />
            ) : (
              <HiOutlineTrash className=" text-rose-500 w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
