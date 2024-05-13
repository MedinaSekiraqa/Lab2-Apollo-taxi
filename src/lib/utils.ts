import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function getImageUrl(imagePath: string) {
   if (!imagePath) {
      return "";
   }
   const folderPath = imagePath.split("\\")[1];
   const fileName = imagePath.split("\\").pop();
   const imageUrl = `${apiUrl}/images/uploads/${folderPath}/${fileName}`;
   try {
      return imageUrl;
   } catch (error) {
      console.error("Error fetching image:", error);
      return "";
   }
}

export const roles = [
   {
     value: "ADMIN",
     label: "Admin",
     //  icon: User2,
   },
   {
     value: "SEKONDAR",
     label: "Sekondar",
     //  icon: User2,
   },
   {
     value: "PRIMAR",
     label: "Primar",
     //  icon: User2,
   },
   {
     value: "PADEKLARUAR",
     label: "Padeklaruar",
     //  icon: User2,
   },
 ]

 export const oraret = [
   {
     value: "PLOTE",
     label: "Plote",
     //  icon: User2,
   },
   {
     value: "GJYS",
     label: "Gjys",
     //  icon: User2,
   },
 ]