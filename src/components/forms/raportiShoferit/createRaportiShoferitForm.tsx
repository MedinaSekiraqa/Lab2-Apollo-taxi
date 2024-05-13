"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { createRaportiShoferitSchema } from "@/lib/schemas";
import { RaportiShoferit, Vetura } from "@/lib/type";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useCreateRaportiShoferitModal } from "@/hooks/use-create-raporti-shoferit-modal";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { SubmitButton } from "../../ui/submitButton";
import toast from "react-hot-toast";

type FormValues = z.infer<typeof createRaportiShoferitSchema>;
type RaportiShoferitFormProps = {
   onSuccess?: () => void;
   raportiShoferit?: RaportiShoferit;
};

export default function CreateRaportiShoferitForm({
   raportiShoferit,
}: RaportiShoferitFormProps) {
   const { isOpen, onClose } = useCreateRaportiShoferitModal();
   const [loading, setLoading] = useState(false);
   const [veturatId, setVeturatId] = useState<Vetura[]>([]);
   const { data: session } = useSession();
   // console.log(session)
   //@ts-ignore
   const token = session?.token?.accessToken;

   // const router = useRouter();

   const form = useForm<FormValues>({
      resolver: zodResolver(createRaportiShoferitSchema),
   });
   useEffect(() => {
      async function getVeturat() {
         const res = await axiosPublic.get("/vetura", {
            headers: {
               Authorization: `${token}`,
            },
         });
         // console.log(res.data);
         setVeturatId(res.data);
         return res.data;
      }
      getVeturat();
   }, []);
   const onSubmit = async (data: FormValues) => {
      try {
         const newData = {
            ...data,
            data: new Date(data.data).toISOString(),
            pranoi: data.pranoi,
            dorzoi: data.dorzoi,
            paushall: data.paushall,
            //@ts-ignore
            userId: session?.user?.id,
         };
         // console.log(newData);
         const res = await axiosPublic.post("/raportiShoferit", newData, {
            headers: {
               Authorization: `${token}`,
               // "Content-Type": "multipart/form-data",
            },
         });
         toast.success("Raporti u dorzua me sukses");
         form.reset();
         onClose();
         // console.log(res.data);
      } catch (error) {
         if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            console.error("Validation error:", error.issues);
            // You can display the validation errors to the user
         } else {
            console.error(error);
            // Handle other errors
         }
      }
   };
   return (
      <div className="flex justify-center items-center">
         <div className="bg-white dark:bg-gray-900  rounded-lg p-8 w-full max-w-md">
            <Form {...form}>
               <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                  // encType="multipart/form-data"
               >
                  <div>
                     <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="pranoi">Pranimi</Label>
                              <FormField
                                 control={form.control}
                                 name="pranoi"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <>
                                             <Input
                                                id="pranoi"
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                   field.onChange(
                                                      parseInt(e.target.value)
                                                   );
                                                }}
                                             />
                                             <FormMessage />
                                          </>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="dorzoi">Dorzimi</Label>
                              <FormField
                                 control={form.control}
                                 name="dorzoi"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <div>
                                             <Input
                                                id="dorzoi"
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                   field.onChange(
                                                      parseInt(e.target.value)
                                                   );
                                                }}
                                             />
                                             <FormMessage />
                                          </div>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="paushall">Paushall</Label>
                              <FormField
                                 control={form.control}
                                 name="paushall"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <>
                                             <Input
                                                id="paushall"
                                                required
                                                type="number"
                                                {...field}
                                                onChange={(e) => {
                                                   field.onChange(
                                                      parseInt(e.target.value)
                                                   );
                                                }}
                                             />

                                             <FormMessage />
                                          </>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="minus">Minus</Label>
                              <FormField
                                 control={form.control}
                                 name="minus"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <>
                                             <Input
                                                disabled
                                                id="minus"
                                                placeholder="Optional"
                                                type="number"
                                                {...field}
                                             />
                                             <FormMessage />
                                          </>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="pershkrimi">Shenim</Label>
                              <FormField
                                 control={form.control}
                                 name="pershkrimi"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormControl>
                                          <>
                                             <Textarea
                                                {...field}
                                                id="pershkrimi"
                                                placeholder="Opsional"
                                             />
                                             <FormMessage />
                                          </>
                                       </FormControl>
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor="veturaId">Vetura</Label>
                              <FormField
                                 control={form.control}
                                 name="veturaId"
                                 render={({ field }) => (
                                    <FormItem>
                                       <Select
                                          disabled={loading}
                                          onValueChange={field.onChange}
                                          value={field.value}
                                          defaultValue={field.value}
                                       >
                                          <FormControl>
                                             <SelectTrigger>
                                                <SelectValue
                                                   defaultValue={field.value}
                                                   placeholder="Selekto veturen"
                                                />
                                             </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                             {veturatId.map((vetura) => (
                                                <SelectItem
                                                   key={vetura.id}
                                                   value={vetura.id!}
                                                >
                                                   {vetura.name}
                                                </SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="data">Data</Label>
                              <FormField
                                 control={form.control}
                                 name="data"
                                 render={({ field }) => (
                                    <FormItem className="flex flex-col w-1/2">
                                       <Popover>
                                          <PopoverTrigger asChild>
                                             <FormControl>
                                                <Button
                                                   variant={"outline"}
                                                   className={cn(
                                                      "w-[185px] pl-3 text-left font-normal",
                                                      !field.value &&
                                                         "text-muted-foreground"
                                                   )}
                                                >
                                                   {field.value ? (
                                                      format(field.value, "PPP")
                                                   ) : (
                                                      <span>Selekto Daten</span>
                                                   )}
                                                   <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                             </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                             className="w-auto p-0"
                                             align="start"
                                          >
                                             <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                   date > new Date() ||
                                                   date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                             />
                                          </PopoverContent>
                                       </Popover>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2 w-full">
                                 <Label htmlFor="startTime">Ora: Fillimi</Label>
                                 <FormField
                                    name="startTime"
                                    control={form.control}
                                    defaultValue=""
                                    render={({ field }) => (
                                       <>
                                          <Input
                                             id="startTime"
                                             required
                                             type="time"
                                             {...field}
                                          />
                                          <FormMessage />
                                       </>
                                    )}
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Label htmlFor="endTime">Ora: Mbarimi</Label>
                                 <FormField
                                    name="endTime"
                                    control={form.control}
                                    defaultValue=""
                                    render={({ field }) => (
                                       <>
                                          <Input
                                             id="startTime"
                                             required
                                             type="time"
                                             {...field}
                                          />
                                          <FormMessage />
                                       </>
                                    )}
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                     <SubmitButton />
                  </div>
               </form>
            </Form>
         </div>
      </div>
   );
}
