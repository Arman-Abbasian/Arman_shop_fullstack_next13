import http from "./httpService";

export function getProducts(qs, cookies) {
  return http
    .get(`/product/list?${qs}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
  // return fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/list?${qs}`, {
  //   cache: "no-store",
  // })
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getOneProdcutBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getOneProdcutById(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}
export function likeProduct(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

// admin relate function
export function addProdcut(data) {
  return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}

export function removeProduct(id) {
  return http.delete(`/admin/product/remove/${id}`).then(({ data }) => data.data);
}

export function updateProduct({ productId, data }) {
  console.log({ data });
  return http
    .patch(`/admin/product/update/${productId}`, data)
    .then(({ data }) => data.data);
}
