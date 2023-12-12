import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req) {
console.log(req.cookies)
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
  console.log(user)
  return user;
}
