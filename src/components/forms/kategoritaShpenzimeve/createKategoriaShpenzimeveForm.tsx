"use client";
import { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import {
   createKategoriaShpenzimeveSchema
} from "@/lib/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import { useCreateKategoriaShpenzimeveModal } from "@/hooks/use-create-kategoriaShepnzimeve-modal";
import toast from "react-hot-toast";
import { SubmitButton } from "../../ui/submitButton";
import { updatekategoriaEShpenzimeve } from "@/utils/mutation";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "../../ui/form";
type FormValues = z.infer<typeof createKategoriaShpenzimeveSchema>;

export default function CreateKategoriaShpenzimeveForm() {
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   const { isOpen, kategoriaEShpenzimeveData, onClose } =
      useCreateKategoriaShpenzimeveModal();

   // console.log();
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const form = useForm<FormValues>({
      defaultValues: kategoriaEShpenzimeveData
         ? {
              emri: kategoriaEShpenzimeveData.emri,
              pershkrimi: kategoriaEShpenzimeveData.pershkrimi,
           }
         : undefined,
      resolver: zodResolver(createKategoriaShpenzimeveSchema),
   });
   const onSubmit = async (data: FormValues) => {
      // console.log("Submiting the form");
      try {
         if (kategoriaEShpenzimeveData) {
            console.log(data);
            await updatekategoriaEShpenzimeve(
               data,
               kategoriaEShpenzimeveData.id,
               token
            );
         } else {
            console.log(data);
            await axiosPublic.post("/kategoriaeshpenzimeve", data, {
               headers: {
                  Authorization: `${token}`,
               },
            });
            toast.success("Kategoria e shpenzimeve u krijua me sukses");
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
                        name="emri"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    id="emri"
                                    defaultValue={
                                       kategoriaEShpenzimeveData?.emri ||
                                       field.value
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
                        htmlFor="pershkrimi"
                     >
                        Pershkrimi
                     </Label>
                     <FormField
                        control={form.control}
                        name="pershkrimi"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Textarea
                                    id="pershkrimi"
                                    defaultValue={
                                       kategoriaEShpenzimeveData?.pershkrimi ||
                                       field.value
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
