export function toStringCookies(cookies) {
  console.log({ cookiesFunction: cookies });
  let strCookie = "";
  cookies?.getAll().forEach((item) => {
    strCookie += `${item?.name}=${item?.value}; `;
  });
  return strCookie;
}
