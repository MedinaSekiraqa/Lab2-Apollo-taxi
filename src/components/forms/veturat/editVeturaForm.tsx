"use client";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import { createVeturaSchema } from "@/lib/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitButton } from "../../ui/submitButton";
import { updatevetura } from "@/utils/mutation";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "../../ui/form";
import { useEditVeturaModal } from "@/hooks/use-edit-vetura-modal";

type FormValues = z.infer<typeof createVeturaSchema>;
export default function EditVeturaForm() {
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   // console.log();
   const router = useRouter();
   const { isOpen, veturaData, onClose } = useEditVeturaModal();
   console.log(veturaData);
   const [loading, setLoading] = useState(false);

   const form = useForm<FormValues>({
      defaultValues: veturaData
         ? {
              name: veturaData.name,
              kilometrazha: veturaData.kilometrazha,
           }
         : undefined,
      resolver: zodResolver(createVeturaSchema),
   });
   const onSubmit = async (data: FormValues) => {
      // console.log("Submiting the form");
      try {
         if (veturaData) {
            console.log(data);
            await updatevetura(data, veturaData.id, token);
            toast.success("Vetura  u ndryshua me sukses");
            form.reset();
            onClose();
            router.refresh();
         } else {
            console.log(data);
            await axiosPublic.post("/vetura", data, {
               headers: {
                  Authorization: `${token}`,
               },
            });
            toast.success("Vetura shpenzimeve u ndryshua me sukses");
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
               <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
                  <div>
                     <Label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="emri"
                     >
                        Emri
                     </Label>
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    id="emri"
                                    defaultValue={
                                       veturaData?.name || field.value
                                    }
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
                        htmlFor="kilometrazha"
                     >
                        Kilometrazha
                     </Label>
                     <FormField
                        control={form.control}
                        name="kilometrazha"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Textarea
                                    id="kilometrazha"
                                    defaultValue={
                                       veturaData?.kilometrazha || field.value
                                    }
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
   );
}
