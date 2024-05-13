"use client"
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export function handleError(error: any) {
   if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>

      if (axiosError.response) {
         const status = axiosError.response.status
         const errorMessage = axiosError.response.data.error

         if (status === 401) {
            toast.error(errorMessage)
         } else if (status === 403) {
            toast.error(errorMessage)
         } else if (status === 404) {
            toast.error(errorMessage)
         } else {
            toast.error(errorMessage)
         }
      } else {
         toast.error("Network error: Unable to connect to the server.")
      }
   } else {
      toast.error("An error occurred.")
   }
}
