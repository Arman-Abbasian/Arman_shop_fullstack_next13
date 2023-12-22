import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const searchParams = useSearchParams();
export const useQueryStringMaker=()=>
useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      //!(params.toString()=> example=  category=German%2CIran
      return params.toString();
    },[searchParams])