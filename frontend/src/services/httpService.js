import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //! when you set 'withCredentials: true' all http cookies attach automatically to user request
  withCredentials: true,
});

//! all user requests pass from here
app.interceptors.request.use(
  //!if the request was fulfilled
  (res) => res,
  //!if the request was rejected
  (err) => Promise.reject(err)
);

//! all response to user all pass from here

app.interceptors.response.use(
  //!if the responses was fulfilled
  (res) => res,
  //!if the responses was rejected
  async (err) => {
    const originalConfig = err.config;
    console.log({f:!originalConfig._retry,status:err.response})
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        //! this api check the refresh token and set new refresh and access token
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        //! app(originalConfig) => this method send a request again 
        //!to the that api that rejected last time with 401
        if (data) return app(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
