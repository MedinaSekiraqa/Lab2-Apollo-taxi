"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateRaportiShoferitSchema } from "@/lib/schemas";
import { RaportiShoferit } from "@/lib/type";
import { useUpdateRaportiShoferitModal } from "@/hooks/use-update-raporti-shoferit-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "../../ui/form";
import { SubmitButton } from "../../ui/submitButton";
import { useState } from "react";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { updateRaportiShoferit } from "@/utils/mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof updateRaportiShoferitSchema>;

export default function UpdateRaportiShoferitForm() {
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   const router = useRouter();
   const { isOpen, data, onClose } = useUpdateRaportiShoferitModal();
   const raportiId = data?.id;
   const [loading, setLoading] = useState(false);
   const form = useForm<FormValues>({
      defaultValues: {
         minus: parseFloat(data.minus), // Convert data.minus to a number
      },
      resolver: zodResolver(updateRaportiShoferitSchema),
   });
   const { errors } = form.formState;

   const onSubmit = async (data: FormValues) => {
      try {
         const newData = {
            ...data,
            minus: data.minus,
         };
         setLoading(true);
         const res = await updateRaportiShoferitSchema.safeParseAsync(data);
         if (res.success) {
            onClose();
         }
         await updateRaportiShoferit(data, raportiId, token);
         toast.success("Raporti u dorzua me sukses");
         router.refresh()
      } catch (error: any) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                  <FormField
                     control={form.control}
                     name="minus"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 id="minus"
                                 type="number"
                                 {...field}
                                 onChange={(e) => {
                                    field.onChange(parseInt(e.target.value));
                                 }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <SubmitButton />
         </form>
      </Form>
   );
}
