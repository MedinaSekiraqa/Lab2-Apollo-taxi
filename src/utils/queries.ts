import { axiosPrivate, axiosPublic } from "./api";
import auth from "./serverToken";

export async function fetchUsers() {
   const token = await auth();
   if (!token) {
      return [];
   }

   try {
      const response = await axiosPrivate.get("/users", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // Handle response data as needed
      // console.log("Response data in the queries function:", response.data);
      return response.data;
      // }
   } catch (error: any) {
      console.log(error);
   }
}

export async function fetchUsersPadeklaruar() {
   const token = await auth();
   if (!token) {
      return [];
   }

   try {
      const response = await axiosPrivate.get("/users/padeklaruar", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // Handle response data as needed
      // console.log("Response data in the queries function:", response.data);
      return response.data;
      // }
   } catch (error: any) {
      console.log(error);
   }
}

export async function fetchUserByUsername(username: string) {
   const token = await auth();
   if (!token) {
      return [];
   }

   try {
      const response = await axiosPrivate.get(`/users/${username}`, {
         headers: {
            Authorization: `${token}`,
         },
      });
      // Handle response data as needed
      // console.log("Response data in the queries function:", response.data);
      return response.data;
      // }
   } catch (error: any) {
      console.log(error);
   }
}

export async function fetchKategoriteEshpenzimeve() {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPrivate.get("/kategoriaeshpenzimeve", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchShpenzimet() {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPrivate.get("/shpenzimet", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchTotalShpenzimetVlera() {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPrivate.get("/shpenzimet/sum", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchVeturat(token?: string) {
   // const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPublic.get("/vetura", {
         headers: {
            Authorization: `${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchRaportiShoferit() {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPrivate.get("/raportiShoferit", {
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchRaportiShoferitByUser(username: string) {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPublic.get(`/raportiShoferit/${username}`, {
         headers: {
            Authorization: `${token}`,
         },
      });
      // console.log(response.data);
      if (response.data.length === 0) {
         return [];
      }
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function fetchRaportiShoferitPadeklauar() {
   const token = await auth();
   if (!token) {
      return [];
   }
   try {
      const response = await axiosPrivate.get(
         "/raportiShoferit/secret/padeklauar",
         {
            headers: {
               Authorization: `${token}`,
            },
         }
      );
      // console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}
