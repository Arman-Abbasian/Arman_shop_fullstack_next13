import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req) {
  //! this is how we attach http cookies in fetch method instead of axios method
  console.log({ cookieeeeeeeesssssssss: req.cookies.getAll() });
  console.log({ toStrCookieeeeeeeee: toStringCookies(req.cookies) });
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: toStringCookies(req.cookies),
      },
    }
  ).then((res) => res.json());
  const { user } = data || {};
  return user;
}
