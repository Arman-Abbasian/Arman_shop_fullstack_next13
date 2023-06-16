import { getAllUsers, getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfile,// in queryFn we write a axios request
    retry: false,//just try the request one time
    refetchOnWindowFocus: true,//every time that you back on this page try new request
  });

export const useGetUsers = () =>
  useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: true,
  });
