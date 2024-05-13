"use client";
import React, { ChangeEvent, useState } from "react";
import { Modal } from "../../ui/modal";
import { useCreateUserModal } from "@/hooks/use-create-user-modal";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { createUserSchema } from "@/lib/schemas";
import { z } from "zod";
import { User } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { axiosPrivate, axiosPublic } from "@/utils/api";
import { useSession } from "next-auth/react";
import { handleError } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useCreateUserModal } from "@/hooks/use-createUser-modal";

type FormValues = z.infer<typeof createUserSchema>;
type UserFormProps = {
   onSuccess?: () => void;
   user?: User;
};

export const CreateUserModal = ({ user }: UserFormProps) => {
   // console.log(user)
   const { data: session } = useSession();
   //@ts-ignore
   const token = session?.token?.accessToken;
   // console.log();
   const router = useRouter();
   const { isOpen,userData,  onClose } = useCreateUserModal();
   console.log(userData);
   const [loading, setLoading] = useState(false);
   const [selectedRole, setSelectedRole] = useState("PRIMAR");
   const [selectedOrari, setSelectedOrari] = useState("PLOTE");
   const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
   const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
      []
   );
   const {
      register,
      setValue,
      handleSubmit,
      control,
      reset,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: userData
         ? {
              name: userData.name,
              lastName: userData.lastName,
              phone: userData.phone,
              email: userData.email,
              role: userData.role,
              orari: userData.orari,
              permissions: userData.permissions,
              notifications: userData.notifications,
              salary: userData.salary,
              address: userData.address,
              username: userData.username,

           }
         : undefined,
      resolver: zodResolver(createUserSchema),
   });
   const onSubmit = async (data: FormValues) => {
      // console.log("Submiting the form");
      try {
         if (user) {
            console.log(data);
            // await fetch(`/api/users/${user.id}`, {
            //    method: "PATCH",
            //    body: JSON.stringify(data),
            // });
         } else {
            const newData = {
               ...data,
               orari: selectedOrari,
               role: selectedRole,
               permissions: selectedPermissions,
               notifications: selectedNotifications,
            };
            await axiosPublic.post("/users", newData, {
               headers: {
                  Authorization: `${token}`,
               },
            });
            toast.success("Useri u shtua me suksess!");
            setSelectedNotifications([]);
            setSelectedPermissions([]);
            reset();
            onClose();
            router.refresh();
         }
      } catch (error) {
         handleError(error);
      }
   };
   const handlePermissionChange = (value: string, event: any) => {
      const newSelectedPermissions = [...selectedPermissions];
      const index = newSelectedPermissions.indexOf(value);
      if (index !== -1) {
         newSelectedPermissions.splice(index, 1);
      } else {
         newSelectedPermissions.push(value);
      }
      setSelectedPermissions(newSelectedPermissions);
      // console.log(selectedPermissions)
   };
   const handleNotificationChange = (value: string, event: any) => {
      const newSelectedNotifications = [...selectedNotifications];
      const index = newSelectedNotifications.indexOf(value);
      if (index !== -1) {
         newSelectedNotifications.splice(index, 1);
      } else {
         newSelectedNotifications.push(value);
      }
      setSelectedNotifications(newSelectedNotifications);
      console.log(selectedNotifications);
   };

   const permissionLabels = {
      FINANCE: "Qasje në financa",
      ADDUSER: "Shtimi i User",
      REPORTS: "Gjenerimi i Raporteve",
      WORKERS: "Qasje tek Puntorët",
   };
   const notificationLabels = {
      SALARY: "Dergo Email për paga",
      SCHEDULE: "Njoftim për ndërrimin të orarit",
      ROLE: "Njoftim për ndërrimin të rolit",
   };
   return (
      <Modal
         title="Shto punetor te ri"
         description="Add a new User to you app"
         isOpen={isOpen}
         onClose={onClose}
      >
         <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className=" p-8 grid grid-cols-2 left-10 gap-16 w-[1000px] h-[600px]  rounded-lg">
                  <div className=" gap-8">
                     <div className="space-y-2 md:col-span-2 w-full">
                        <h2 className="text-3xl font-bold text-apolloHeading">
                           Regjistro Puntorë të ri
                        </h2>
                        <div>
                           <h3 className="text-xl font-semibold text-apolloHeading">
                              Informacion rreth Puntorit
                           </h3>
                           <Textarea
                              {...register("userInfo")}
                              placeholder="Sheno Informacione..."
                           />
                        </div>
                        <div className="flex w-full gap-2">
                           <div className="w-full">
                              <Label htmlFor="full-name">Emri</Label>
                              <Input
                                 {...register("name")}
                                 id="name"
                                 placeholder="Sheno Emrin ..."
                                 value={userData?.name}
                              />
                              {errors.name && (
                                 <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                 </p>
                              )}
                           </div>
                           <div className="w-full">
                              <Label htmlFor="full-name"> Mbiemri</Label>
                              <Input
                                 {...register("lastName")}
                                 id="lastname"
                                 placeholder="Sheno  Mbiemrin..."
                              />
                              {errors.lastName && (
                                 <p className="text-red-500 text-sm">
                                    {errors.lastName.message}
                                 </p>
                              )}
                           </div>
                        </div>
                        <div>
                           <Label htmlFor="phone">Numri Telefonit</Label>
                           <Input
                              {...register("phone")}
                              id="phone"
                              placeholder="Sheno Numrin e Telefonit..."
                           />
                           {errors.phone && (
                              <p className="text-red-500 text-sm">
                                 {errors.phone.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <Label htmlFor="email">E-Mail</Label>
                           <Input
                              {...register("email")}
                              id="email"
                              placeholder="Sheno Email Adressen"
                              type="email"
                           />
                           {errors.email && (
                              <p className="text-red-500 text-sm">
                                 {errors.email.message}
                              </p>
                           )}
                        </div>
                        <div>
                           <Label htmlFor="location">Lokacioni</Label>
                           <Input
                              {...register("address")}
                              id="location"
                              placeholder="Sheno Lokacionin"
                           />
                           {errors.address && (
                              <p className="text-red-500 text-sm">
                                 {errors.address.message}
                              </p>
                           )}
                        </div>
                        <div className="">
                           <Label className="flex-grow" htmlFor="salary">
                              Paga
                           </Label>
                           <Input
                              {...register("salary", {
                                 setValueAs: (value) => parseFloat(value),
                              })}
                              className="flex-grow"
                              id="salary"
                              placeholder="Shtyp Pagen"
                              type="number"
                           />
                           {/* {errors.salary && (
                              <span className="text-red-500">
                                 {errors.salary.message}
                              </span>
                           )} */}
                        </div>
                        <Button type="submit" className="mt-8 ">
                           Regjistro Puntorë të ri
                        </Button>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 ">
                     <div className="">
                        <h3 className="text-xl font-semibold text-apolloHeading">
                           TE DREJTAT
                        </h3>
                        <div className="flex flex-col pt-6 space-y-4">
                           <div className="flex items-center gap-2">
                              <Switch
                                 id="employee-access"
                                 checked={selectedPermissions.includes(
                                    "FINANCE"
                                 )}
                                 onCheckedChange={(e) => {
                                    handlePermissionChange("FINANCE", e);
                                 }}
                              />
                              <Label className="" htmlFor="employee-access">
                                 Qasje ne Financa
                              </Label>
                           </div>
                           <div className="flex items-center gap-2">
                              <Switch
                                 id="employee-access"
                                 checked={selectedPermissions.includes(
                                    "WORKERS"
                                 )}
                                 onCheckedChange={(e) => {
                                    handlePermissionChange("WORKERS", e);
                                 }}
                              />
                              <Label className="" htmlFor="employee-access">
                                 Qasje tek Puntorët
                              </Label>
                           </div>
                           <div className="flex items-center gap-2">
                              <Switch
                                 id="user-submission"
                                 checked={selectedPermissions.includes(
                                    "ADDUSER"
                                 )}
                                 onCheckedChange={(e) => {
                                    handlePermissionChange("ADDUSER", e);
                                 }}
                              />
                              <Label className="" htmlFor="user-submission">
                                 Shtimi i User
                              </Label>
                           </div>
                           <div className="flex items-center gap-2">
                              <Switch
                                 id="reports-access"
                                 checked={selectedPermissions.includes(
                                    "REPORTS"
                                 )}
                                 onCheckedChange={(e) => {
                                    handlePermissionChange("REPORTS", e);
                                 }}
                              />
                              <Label className="" htmlFor="reports-access">
                                 Gjenerimi i Raporteve
                              </Label>
                           </div>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-apolloHeading">
                           APPLIKACIONI
                        </h3>
                        <div className="flex flex-col pt-6 space-y-2 gap-1">
                           <div className=" flex flex-col pt-6 space-y-4">
                              <div className="flex items-center gap-2">
                                 <Switch
                                    id="email-payroll"
                                    checked={selectedNotifications.includes(
                                       "SALARY"
                                    )}
                                    onCheckedChange={(e) => {
                                       handleNotificationChange("SALARY", e);
                                    }}
                                 />
                                 <Label htmlFor="email-payroll">
                                    Dergo Email për paga
                                 </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Switch
                                    id="notify-role-change"
                                    checked={selectedNotifications.includes(
                                       "ROLE"
                                    )}
                                    onCheckedChange={(e) => {
                                       handleNotificationChange("ROLE", e);
                                    }}
                                 />
                                 <Label htmlFor="notify-role-change">
                                    Njoftim për ndërrimin të rolit
                                 </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                 <Switch
                                    onCheckedChange={(e) => {
                                       handleNotificationChange("SCHEDULE", e);
                                    }}
                                    checked={selectedNotifications.includes(
                                       "SCHEDULE"
                                    )}
                                    id="notify-schedule-change"
                                    // defaultChecked
                                 />
                                 <Label htmlFor="notify-schedule-change">
                                    Njoftim për ndërrimin të orarit
                                 </Label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-apolloHeading">
                           Role
                        </h3>
                        <div className=" flex flex-col space-y-4 pt-6">
                           <RadioGroup
                              defaultValue="PRIMAR"
                              name="role"
                              onChange={(e: any) =>
                                 setSelectedRole(e.target.value)
                              }
                           >
                              {[
                                 "ADMIN",
                                 "PRIMAR",
                                 "SEKONDAR",
                                 "PADEKLARUAR",
                              ].map((value) => (
                                 <div
                                    key={value}
                                    className="flex items-center gap-2"
                                 >
                                    <RadioGroupItem
                                       value={value}
                                    ></RadioGroupItem>
                                    <Label
                                       className=""
                                       htmlFor={`role-${value.toLowerCase()}`}
                                    >
                                       {value}
                                    </Label>
                                 </div>
                              ))}
                           </RadioGroup>
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xl font-semibold text-apolloHeading">
                           Orari
                        </h3>
                        <div className="flex flex-col space-y-4 pt-6">
                           <RadioGroup
                              // value={selectedOrari}
                              onChange={(e: any) =>
                                 setSelectedOrari(e.target.value)
                              }
                              name="orari"
                              defaultValue="PLOTE"
                           >
                              {["PLOTE", "GJYS"].map((value) => (
                                 <div
                                    key={value}
                                    className="flex items-center gap-2"
                                 >
                                    <RadioGroupItem
                                       value={value}
                                    ></RadioGroupItem>
                                    <Label
                                       className=""
                                       htmlFor={`orari-${value.toLowerCase()}`}
                                    >
                                       {value}
                                    </Label>
                                 </div>
                              ))}
                           </RadioGroup>
                           {/* <div className="flex items-center gap-2">
                              <Switch id="shift-morning" />
                              <Label className="" htmlFor="shift-morning">
                                 Paradite
                              </Label>
                           </div>
                           <div className="flex items-center gap-2">
                              <Switch id="shift-evening" />
                              <Label htmlFor="shift-evening">Pasdite</Label>
                           </div> */}
                        </div>
                     </div>
                     <div className="col-span-2">
                        <h1 className="text-apolloHeading text-3xl font-semibold">
                           Informacione për Përdoruesit
                        </h1>
                        <div className="flex w-full gap-2 pt-4">
                           <div className="w-full">
                              <Label htmlFor="full-name">Username</Label>
                              <Input
                                 {...register("username")}
                                 id="name"
                                 placeholder="Username "
                              />
                              {errors.username && (
                                 <p className="text-red-500 text-sm">
                                    {errors.username.message}
                                 </p>
                              )}
                           </div>
                           <div className="w-full">
                              <Label htmlFor="full-name"> Password</Label>
                              <Input
                                 {...register("password")}
                                 id="lastname"
                                 placeholder="Password"
                              />
                              {errors.password && (
                                 <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                 </p>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </Modal>
   );
};
