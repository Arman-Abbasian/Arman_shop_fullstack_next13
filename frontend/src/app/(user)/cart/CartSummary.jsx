'use client'

import Loading from "@/common/Loading";
import { createPayment } from "@/services/paymentService";
import { toNumbersWithComma } from "@/utils/toPersianNumbers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });
  const queryClient = useQueryClient();

  const createPaymentHandler = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="border px-2 py-4 rounded-xl">
      <p className="mb-4 font-bold">pay detail</p>
      <div className="mb-4 flex items-center justify-between">
        <span>total</span>
        <span>{toNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span>discount</span>
        <span>-{toNumbersWithComma(totalOffAmount)}</span>
      </div>
      <div className="mb-6 flex items-center justify-between font-bold">
        <span>payable cost</span>
        <span>{toNumbersWithComma(totalPrice)}</span>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            className="btn btn--primary w-full"
            onClick={createPaymentHandler}
          >
           pay
          </button>
        )}
      </div>
    </div>
  );
}
export default CartSummary;
