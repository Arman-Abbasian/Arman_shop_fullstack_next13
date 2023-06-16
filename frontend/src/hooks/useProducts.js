import {
  addProdcut,
  getOneProdcutById,
  getProducts,
  removeProduct,
  updateProduct,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => {
  return useMutation({ mutationFn: addProdcut });
};

export const useUpdateProduct = () => {
  return useMutation({ mutationFn: updateProduct });
};

export const useRemoveProduct = () => {
  return useMutation({ mutationFn: removeProduct });
};

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProdcutById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
