import { getAllPayments } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () =>
  useQuery({ queryKey: ["payments"], queryFn: getAllPayments, retry: false });
