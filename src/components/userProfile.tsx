"use client";
import React from "react";
import {
   DropdownMenuItem,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { axiosPrivate } from "@/utils/api";
import {logout} from "@/utils/mutation";
// import { logout } from "@/utils/mutation";

export default function UserProfile() {
   const token = useSession()
   const handleLogout = async () => {
      // console.log(token)
      await logout(token.data);
   };
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
               <CircleUser className="h-5 w-5" />
               <span className="sr-only">Toggle user menu</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
               className="cursor-pointer"
               onClick={ handleLogout}
            >
               Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
