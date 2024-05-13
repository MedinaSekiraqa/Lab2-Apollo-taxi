// api.ts
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
// import { useSession } from 'next-auth/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// console.log(BASE_URL)
// const { data: session } = useSession();
// const userId = session?.user?.email;
export const createAxiosInstance = (config?: AxiosRequestConfig) => {
   const axiosInstance = axios.create({
      baseURL: BASE_URL,
      ...config,
   });
   return axiosInstance;
};

export const axiosPublic = createAxiosInstance({
   withCredentials: false, // Include this line for credentials
});

// export const createPrivateAxiosInstance = (config?: AxiosRequestConfig) => {
//    const axiosInstance = axios.create({
//       baseURL: BASE_URL,
//       ...config,
//    });

//    // Add an interceptor to modify the request before it's sent
//    axiosInstance.interceptors.request.use(
//       (requestConfig) => {
//          if (typeof window !== "undefined") {
//             const accessToken = sessionStorage.getItem("AccessToken");
//             console.log(accessToken);
//             if (accessToken) {
//                requestConfig.headers = {
//                   ...requestConfig.headers,
//                   // Authorization: `${accessToken}`,
//                   // 'Content-Type': 'application/json',
//                   // Accept: 'application/json',
//                } as AxiosRequestHeaders;
//             }
//          }
//          return requestConfig;
//       },
//       (error) => {
//          return Promise.reject(error);
//       }
//    );

//    return axiosInstance;
// };
export const axiosPrivate = createAxiosInstance({
   withCredentials: true, // Include this line for credentials
});
