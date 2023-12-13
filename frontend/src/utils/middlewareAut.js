import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req) {
console.log(req.cookies)
//! this is how we attach http cookies in fetch method instead of axios method
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: toStringCookies(req.cookies),
      },
    }
  ).then((res) => res.json());
  const { user } = data || {};
  return user;
}
