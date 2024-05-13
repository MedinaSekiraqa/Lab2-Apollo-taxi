"use client";

import { logout } from "@/utils/mutation";
import { useSession } from "next-auth/react";
import { Button } from "./button";

export default function LogoutButton() {
   const token = useSession()
   const handleLogout = async () => {
      // console.log(token)
      await logout(token.data);
   };
  return (
    <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3" onClick={handleLogout}>
      Logout
    </Button>
  )
}
