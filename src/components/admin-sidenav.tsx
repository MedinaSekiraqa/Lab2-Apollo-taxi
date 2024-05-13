"use client";
import Link from "next/link";
import { BarChartIcon, CreditCard, Home, UserIcon, Wrench } from "lucide-react";

import { apolloRed } from "@/utils/colors";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@/lib/type";
import { useAuth } from "@/hooks/useAuth";

export default function AdminSidenav({user}:{user:User}) {
   const session = useAuth();
   // console.log(session);
   const path = usePathname();

   return (
      <>
         <header className=" flex flex-col   gap-4  bg-apolloBg px-4 md:px-16 lg:py-4">
            <nav className=" hidden lg:flex lg:flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-start md:gap-5 md:text-sm lg:gap-6">
               <Link
                  href="/"
                  className={`${
                     path === `/`
                        ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                        : "bg-transparent"
                  } flex items-center gap-2 text-foreground  transition-colors hover:text-foreground `}
               >
                  <Home
                     fill={path === "/" ? "white" : apolloRed}
                     stroke={path === "/" ? apolloRed : "white"}
                     className={`${
                        path === `/` ? `bg-apolloRed ` : "bg-transparent"
                     } rounded-full bg-apolloRed h-10 w-10 px-2`}
                  />
                  Dashboard
               </Link>

               <Link
                  href="/punetoret"
                  className={`${
                     path === `/punetoret`
                        ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                        : "bg-transparent"
                  } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
               >
                  <UserIcon
                     fill={path === "/punetoret" ? "white" : apolloRed}
                     stroke={path === "/punetoret" ? "white" : apolloRed}
                     className={`${
                        path === `/punetoret`
                           ? `bg-apolloRed `
                           : "bg-transparent"
                     } rounded-full bg-apolloRed h-10 w-10 px-2`}
                  />
                  Punëtoret
               </Link>
               <Link
                  href="/pagesat"
                  className={`${
                     path === `/pagesat`
                        ? "bg-gray-100  p-4 rounded-lg pr-4"
                        : "bg-transparent"
                  } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
               >
                  <CreditCard
                     fill={path === "/pagesat" ? "white" : apolloRed}
                     stroke={path === "/pagesat" ? apolloRed : "white"}
                     className={`${
                        path === `/pagesat` ? `bg-apolloRed ` : "bg-transparent"
                     } rounded-full bg-apolloRed h-10 w-10 px-2`}
                  />{" "}
                  Pagesat
               </Link>

               <Link
                  href="/raporti"
                  className={`${
                     path === `/raporti`
                        ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                        : "bg-transparent"
                  } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
               >
                  <BarChartIcon
                     fill={path === "/raporti" ? "white" : apolloRed}
                     stroke={path === "/raporti" ? "white" : apolloRed}
                     className={`${
                        path === `/raporti` ? `bg-apolloRed ` : "bg-transparent"
                     } rounded-full bg-apolloRed h-10 w-10 px-2`}
                  />{" "}
                  Raporti
               </Link>
            
            
           
               {!user && (
                  <Link
                     href="/login"
                     className={`${
                        path === `/login`
                           ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                           : "bg-transparent"
                     } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
                  >
                     <UserIcon
                        fill={path === "/login" ? "white" : apolloRed}
                        stroke={path === "/login" ? "white" : apolloRed}
                        className={`${
                           path === `/login`
                              ? `bg-apolloRed `
                              : "bg-transparent"
                        } rounded-full bg-apolloRed h-10 w-10 px-2`}
                     />
                     Login
                  </Link>
               )}

               {user?.role === "ADMIN" && (
                  <Link
                     href="/kompania"
                     className={`${
                        path === `/users`
                           ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                           : "bg-transparent"
                     } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
                  >
                     <Wrench
                        fill={path === "/kompania" ? "white" : apolloRed}
                        stroke={path === "/kompania" ? "white" : apolloRed}
                        className={`${
                           path === `/kompania`
                              ? `bg-apolloRed `
                              : "bg-transparent"
                        } rounded-full bg-apolloRed h-10 w-10 px-2`}
                     />
                     Kompania
                  </Link>
               )}

               <Link
                  href={`/users/${user?.username || "#"}`}
                  className={`${
                     path === `/users/*`
                        ? "bg-[#D9D9D9]  p-4 rounded-lg pr-4"
                        : "bg-transparent"
                  } flex items-center gap-2 text-foreground transition-colors hover:text-foreground `}
               >
                  <UserIcon
                     fill={path === "/users" ? "white" : apolloRed}
                     stroke={path === "/users" ? "white" : apolloRed}
                     className={`${
                        path === `/users` ? `bg-apolloRed ` : "bg-transparent"
                     } rounded-full bg-apolloRed h-10 w-10 px-2`}
                  />
                  UserDetail
               </Link>
               {/* <Link
                        href="/kompania"
                        className="text-muted-foreground hover:text-foreground"
                     >
                        Kompania
                     </Link> */}
            </nav>
         </header>
      </>
   );
}
