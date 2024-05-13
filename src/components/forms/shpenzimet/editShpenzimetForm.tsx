"use client";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import {
   createShpenzimetSchema
} from "@/lib/schemas";
import { z } from "zod";
import { KategoriaShpenzimeve } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "../../ui/submitButton";
import { updatekategoriaEShpenzimeve } from "@/utils/mutation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form";

import { useEditShpenzimetModal } from "@/hooks/use-edit-shpenzimet-modal";



type FormValues = z.infer<typeof createShpenzimetSchema>;
type KategoriaShpenzimeveFormProps = {
   onSuccess?: () => void;
   kategoriaShpenzimeve?: KategoriaShpenzimeve;
};

export default function EditShpenzimetForm({
   kategoriaShpenzimeve,
}: KategoriaShpenzimeveFormProps) {
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   const router = useRouter();
   const { isOpen, shpenzimetData, onClose } = useEditShpenzimetModal();
   console.log(shpenzimetData)
   const [loading, setLoading] = useState(false);

   const form = useForm<FormValues>({
      defaultValues: shpenzimetData
         ? {
              kategoriaId: shpenzimetData.kategoria.emri,
              vlera: shpenzimetData.vlera,
              data: shpenzimetData.data,
            //   pershkrimi: shpenzimetData.pershkrimi,
            //   imagePath: shpenzimetData.imagePath,
            //   userId: shpenzimetData.userId,
            //   veturaId: shpenzimetData.veturaId,
           }
         : undefined,
      resolver: zodResolver(createShpenzimetSchema),
   });
   const onSubmit = async (data: FormValues) => {
      try {
         if (shpenzimetData) {
            console.log(data);
            await updatekategoriaEShpenzimeve(data, shpenzimetData.id, token);
            toast.success("Shpenzimi u ndryshua me sukses");
            form.reset();
            onClose();
            router.refresh();
         } else {
            console.log(data)
            await axiosPublic.post("/shpenzimet", data, {
               headers: {
                  Authorization: `${token}`,
               },
            });
            toast.success("Shpenzimi u krijua me sukses");
            form.reset();
            onClose();
            router.refresh();
         }
      } catch (error) {
         handleError(error);
      }
   };
  return (
   <div className="flex justify-center items-center">
   <div className="bg-white dark:bg-gray-900  rounded-lg p-8 w-full max-w-md">
      <Form {...form}>
         <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
               <Label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="emri"
               >
                  Emri
               </Label>
               <FormField
                  control={form.control}
                  name="kategoriaId"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              id="kategoriaId"
                              defaultValue={shpenzimetData?.kategoriaId || field.value}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div>
               <Label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="kategoria"
               >
                  Kategoria
               </Label>
               <FormField
                  control={form.control}
                  name="vlera"
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Textarea
                              id="vlera"
                              defaultValue={shpenzimetData?.vlera || field.value}
                              rows={3}
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

            </div>
            <SubmitButton loading={loading} />
         </form>
      </Form>
   </div>
</div>
  )
}
