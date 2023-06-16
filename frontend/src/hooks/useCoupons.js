import {
  addNewCoupon,
  deleteCoupon,
  getAllCoupns,
  getOneCoupon,
  updateCoupon,
} from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCoupns,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetOneCoupon = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getOneCoupon(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddNewCoupon = () => useMutation({ mutationFn: addNewCoupon });

export const useUpdateCoupon = () => useMutation({ mutationFn: updateCoupon });

export const useRemoveCoupon = () => useMutation({ mutationFn: deleteCoupon });
