import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req) {
  // let strCookie = "";
  // req.cookies.getAll().forEach((item) => {
  //   strCookie += `${item?.name}=${item?.value}; `;
  // });

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
