"use client";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { createVeturaSchema } from "@/lib/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useCreateVeturaModal } from "@/hooks/use-create-vetura-modal";
import toast from "react-hot-toast";
import { SubmitButton } from "../../ui/submitButton";

type FormValues = z.infer<typeof createVeturaSchema>;
export default function CreateVeturaForm() {
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   const { isOpen, onClose } = useCreateVeturaModal();

   // console.log();
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const {
      register,
      setValue,
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<FormValues>({
      resolver: zodResolver(createVeturaSchema),
   });
   const onSubmit = async (data: FormValues) => {
      // console.log("Submiting the form");
      try {
         setLoading(true);

         await axiosPublic.post("/vetura", data, {
            headers: {
               Authorization: `${token}`,
            },
         });
         toast.success("vetura u krijua me sukses");
         reset();
         onClose();
         router.refresh();
      } catch (error) {
         handleError(error);
      } finally {
         setLoading(false);
      }
   };
   return (
      <div className="flex justify-center items-center">
         <div className="bg-white dark:bg-gray-900  rounded-lg p-8 w-full max-w-md">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
               <div>
                  <Label
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                     htmlFor="emri"
                  >
                     Emri
                  </Label>
                  <Input
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                     {...register("name")}
                     id="emri"
                     // name="emri"
                     placeholder="Emri"
                     type="text"
                  />
               </div>
               <div>
                  <Label
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                     htmlFor="kilometrazha"
                  >
                     Kilometrazha
                  </Label>
                  <Input
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                     {...register("kilometrazha")}
                     id="kilometrazha"
                     placeholder="Kilometrazha"
                  />
               </div>
               <SubmitButton loading={loading} />
            </form>
         </div>
      </div>
   );
}
