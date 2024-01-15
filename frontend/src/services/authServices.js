import { useId } from "react";
import http from "./httpService";

export function getOtp(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtp(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfile(data) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getUserProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateProfile(data) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export function logout() {
  return http.post("/user/logout");
}

// admin related fetchs :

export function getAllUsers() {
  return http.get("/admin/user/list").then(({ data }) => data.data);
}
export async function getUserByParam(userId) {
  try {
   const res= await http.get(`/admin/user/${userId}`);
   const data=res.data.data.data;
   return data
  } catch (error) {
    return error
  }
  return 
}
