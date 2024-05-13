"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginImage from "@/app/assets/images/login-image.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { axiosPublic } from "@/utils/api";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
const loginSchema = z.object({
   //  name: z
   //     .string({ required_error: "Name is Required" })
   //     .min(3, { message: "Name must be at least 3 characters long" }),
   username: z
      .string()
      .min(3, { message: "Email is required" }),
   password: z.string().min(6, { message: "Password is required" }),
});
type loginFormValues = z.infer<typeof loginSchema>;
export function LoginForm() {
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const form = useForm<loginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         username: "",
         //  name: "",
         password: "",
      },
   });
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/";
   const onSubmit = async (values: loginFormValues) => {
      try {
         // console.log(values)
         setLoading(true);
         const res = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
            callbackUrl: "/",
         });
         // console.log(res);
         if (!res?.error) {
            form.reset();
            router.push(callbackUrl);
            toast.success("Login succesfuly", { duration: 5000 });
          }else {
            toast.error(res.error)
          }
         setLoading(false);
      } catch (error: any) {
         toast.error(error.message);
      } finally {
         setLoading(false);
      }
   };
   return (
      <div className="w-full lg:grid lg:min-h-[600px] lg:h-screen lg:grid-cols-2 xl:min-h-[800px] ">
         <div className="flex items-center justify-center py-12 h-screen">
            <div className="mx-auto grid w-[350px] gap-6">
               <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                     Enter your email below to login to your account
                  </p>
               </div>
               <div className="grid gap-4">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                           <Label htmlFor="email">Username</Label>
                           <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                 <FormItem>
                                    <Input
                                       type="text"
                                       id="username"
                                       placeholder="Username"
                                       className="border border-gray-300 rounded px-3 py-2 w-full"
                                       {...field}
                                    />
                                    <FormMessage className="text-red-500" />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <div className="grid gap-2 pb-2">
                           <div className="flex items-center py-2">
                              <Label htmlFor="password">Password</Label>
                           </div>
                           <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <Input
                                       type="password"
                                       id="password"
                                       placeholder="Password"
                                       className="border border-gray-300 rounded px-3 py-2 w-full"
                                       {...field}
                                    />
                                    <FormMessage className="text-red-500" />
                                 </FormItem>
                              )}
                           />
                        </div>
                        <Button disabled={loading} type="submit" className="w-full">
                           {loading ? "Loading..." : "Login"}
                        </Button>
                     </form>
                  </Form>
               </div>
            </div>
         </div>
         <div className="hidden bg-muted lg:block ">
            <Image
               src={loginImage}
               alt="Image"
               width="1920"
               height="862"
               className="h-full w-full object-cover object-fit dark:brightness-[0.2] dark:grayscale "
            />
         </div>
      </div>
   );
}
