import { signOut } from "next-auth/react";
import {  axiosPublic } from "./api";
import toast from "react-hot-toast";
import auth from "./serverToken";

export const logout = async (token:any) => {
   // console.log(token)
   //@ts-ignore
   // const token = await getServerSession(authOptions);
   // console.log("TOKEN IN MUTATIONS", tokenn);
   try {
      if (!token || !token.token || !token.token.accessToken) {
         throw new Error('Invalid token');
      }
      const tokenn = token.token.accessToken
      const response = await axiosPublic.post("/users/logout",null, {
         headers: {
            Authorization: `${tokenn}`,
         },
      });
      await signOut({ callbackUrl: "/login" });
      // console.log(response.data)
   } catch (error:any) {
      toast.error(error.response.data.message);
   }  
}

export const deleteUser = async (id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.delete(`/users/delete/${id}`,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}
export const deleteShpenzimet = async (id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.delete(`/shpenzimet/${id}`,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}
export const deletevetura = async (id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.delete(`/vetura/${id}`,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}
export const deletekategoriaEShpenzimeve = async (id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.delete(`/kategoriaEShpenzimeve/${id}`,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}
export const updatekategoriaEShpenzimeve = async (data:any,id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.put(`/kategoriaEShpenzimeve/${id}`,data,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}
export const updatevetura = async (data:any,id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.put(`/vetura/${id}`,data,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}

export const updateShpenzimet = async (data:any,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.put(`/shpenzimet/${data.id}`,data,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}


export const updateRaportiShoferit = async (data:any,id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.put(`/raportiShoferit/update/${id}`,data,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}

export const deleteRaportiShoferit = async (id:string,token:string) => {
   // const token = await auth();
   if (!token) {
      return toast.error("Unauthorized");
   }
   
   try {
      const response = await axiosPublic.delete(`/raportiShoferit/delete/${id}`,{
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data)
      return response.data;
   } catch (error:any) {
      toast.error(error.response.data.message);
   }
}