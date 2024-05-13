"use client";
import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import { createShpenzimetSchema } from "@/lib/schemas";
import { z } from "zod";
import { KategoriaShpenzimeve, Vetura } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCreateShpenzimetModal } from "@/hooks/use-create-shpenzimet-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import toast from "react-hot-toast";
import Image from "next/image";
import { SubmitButton } from "../../ui/submitButton";
import { fetchVeturat } from "@/utils/queries";

type FormValues = z.infer<typeof createShpenzimetSchema>;


export default function CreateShpenzimetForm() {
   const [kategoriteId, setKategoriteId] = useState<KategoriaShpenzimeve[]>([]);
  const [veturatId, setVetuartId] = useState<Vetura[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  //@ts-ignore
  const token = session?.token?.accessToken;
  //@ts-ignore
  const userid = session?.user?.id;
  // console.log(session?.user?.id);
  const router = useRouter();
  const { isOpen, onClose } = useCreateShpenzimetModal();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null || "");

  // Handle change
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-ignore
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(createShpenzimetSchema),
  });
  useEffect(() => {
    async function getVeturatId() {
      const veturat = await fetchVeturat(token);
      setVetuartId(veturat);
      return veturat;
    }
    getVeturatId();

    async function getKategorites() {
      const res = await axiosPublic.get("/kategoriaeshpenzimeve", {
        headers: {
          Authorization: `${token}`,
        },
      });
      // console.log(res.data);
      setKategoriteId(res.data);
      return res.data;
    }
    getKategorites();
  }, []);
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
        const newData = {
          ...data,
          data: new Date(data.data).toISOString(),
          imagePath: image,
          vlera: data.vlera,
          //@ts-ignore
          userId: session?.user?.id,
        };
        await axiosPublic.post("/shpenzimet", newData, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setImage(null);
        setImagePreview("");
        toast.success("Shpenzimi u shtua me sukses!");
        form.reset();
        onClose();
        router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex justify-center items-center">
   <div className="bg-white dark:bg-gray-900  rounded-lg p-8 w-full max-w-md">
     <Form {...form}>
       <form
         className="space-y-4"
         onSubmit={form.handleSubmit(onSubmit)}
         encType="multipart/form-data"
       >
         <div>
           <FormField
             control={form.control}
             name="kategoriaId"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Kategoria</FormLabel>
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
                         placeholder="Selekto nje kategori"
                       />
                     </SelectTrigger>
                   </FormControl>
                   <SelectContent>
                     {kategoriteId.map((kategoria) => (
                       <SelectItem
                         key={kategoria.id}
                         value={kategoria.id!}
                       >
                         {kategoria.emri}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
                 <FormMessage />
               </FormItem>
             )}
           />
         </div>
         <div>
           <FormField
             control={form.control}
             name="veturaId"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Vetura</FormLabel>
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
                         placeholder="Selekto nje vetur"
                       />
                     </SelectTrigger>
                   </FormControl>
                   <SelectContent>
                     {veturatId.map((vetura) => (
                       <SelectItem key={vetura.id} value={vetura.id!}>
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
         <div className="grid grid-cols-2 gap-3">
           <div>
             <FormField
               name="vlera"
               control={form.control}
               render={({ field }) => (
                 <FormItem>
                   <FormLabel
                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                     htmlFor="vlera"
                   >
                     Vlera
                   </FormLabel>
                   <Input
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm   sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                     {...field}
                     type="number"
                     placeholder="Vlera"
                     disabled={loading}
                     onChange={(e) => {
                       field.onChange(parseInt(e.target.value));
                     }}
                     min={1}
                     value={field.value}
                   />

                   <FormMessage />
                 </FormItem>
               )}
             />
           </div>
           <div className="flex items-center w-full">
             <FormField
               control={form.control}
               name="data"
               render={({ field }) => (
                 <FormItem className="flex flex-col w-1/2">
                   <FormLabel>Data</FormLabel>
                   <Popover>
                     <PopoverTrigger asChild>
                       <FormControl>
                         <Button
                           variant={"outline"}
                           className={cn(
                             "w-[185px] pl-3 text-left font-normal",
                             !field.value && "text-muted-foreground"
                           )}
                         >
                           {field.value ? (
                             format(field.value, "PPP")
                           ) : (
                             <span>Pick a date</span>
                           )}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                         </Button>
                       </FormControl>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0" align="start">
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
                   {/* <FormDescription>
                                  Your date of birth is used to calculate
                                  your age.
                               </FormDescription> */}
                   <FormMessage />
                 </FormItem>
               )}
             />
           </div>
         </div>
         <div className=" flex flex-col justify-center w-full gap-2">
           <FormField
             name="imagePath"
             control={form.control}
             render={({ field }) => (
               <FormItem>
                 <Label
                   className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                   htmlFor="imagePath"
                 >
                   Foto
                 </Label>
                 <Input
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:  sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                   {...field}
                   id="imagePath"
                   onChange={handleFileChange}
                   type="file"
                   value={field.value || undefined}
                 />
                 <FormMessage />
               </FormItem>
             )}
           />
           {imagePreview && (
             <div className="flex w-full justify-center">
               <Image
                 src={imagePreview}
                 alt="image"
                 width={200}
                 height={50}
               />
             </div>
           )}
         </div>

         <div>
           <FormField
             name="pershkrimi"
             control={form.control}
             render={({ field }) => (
               <FormItem>
                 <Label
                   className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                   htmlFor="pershkrimi"
                 >
                   Pershkrimi
                 </Label>
                 <Textarea
                   className="mt-1 block w-full rounded-md border-gray-3
                                  00 shadow-sm focus:  sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                   {...field}
                   id="pershkrimi"
                   placeholder="Pershkrimi"
                   rows={3}
                   disabled={loading}
                   onChange={(e) => {
                     field.onChange(e.target.value);
                     field.onBlur();
                   }}
                   value={field.value}
                 />
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
