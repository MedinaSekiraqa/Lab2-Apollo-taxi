import { UserDetails } from "@/components/userDetailPage";
import React from "react";

export default function UserPage({ params }: { params: { username: string } }) {
   return (
      <div>
         <UserDetails username={params.username} />
      </div>
   );
}
