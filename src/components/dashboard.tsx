// "use client";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/app/assets/images/logo.png";
import Image from "next/image";
import Sidenav from "./sidenav";
import UserProfile from "./userProfile";
// import { useSession } from "next-auth/react";
import serverUser from "@/utils/serverSession";
import serverToken from "@/utils/serverToken";
import LogoutButton from "./ui/logoutButton";
import AdminSidenav from "./admin-sidenav";

export async function Dashboard({ children }: { children?: React.ReactNode }) {
   // const {data:session} = useSession();
   const token = await serverToken();
   const user = await serverUser();
   return (
      <div className="min-h-screen flex  w-full ">
         <div className="hidden  bg-apolloBg lg:block dark:bg-gray-800/40 h-full w-[300px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
               <div className="flex h-12 items-center justify-center py-16 px-8">
                  <Link
                     className="flex items-center gap-2 font-semibold"
                     href="#"
                  >
                     <Image src={logo} alt="Logo" width={150} height={150} />
                  </Link>
               </div>
               {user?.role === "ADMIN" ? <AdminSidenav user={user!}/> :<Sidenav user={user!}  />}
            </div>
         </div>
         <div className="flex min-h-screen w-full flex-col">
            <header className=" flex  items-center gap-4    px-4 md:px-6 lg:py-4">
               <Sheet>
                  <SheetTrigger asChild>
                     <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 lg:hidden"
                     >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                     </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                     <div className="flex h-12 items-center justify-center py-16 px-8">
                        <Link
                           className="flex items-center gap-2 font-semibold"
                           href="/"
                        >
                           <Image
                              src={logo}
                              alt="Logo"
                              width={120}
                              height={120}
                           />
                        </Link>
                     </div>
                     <nav className="grid gap-6 text-lg font-medium text-center overflow-y-scroll h-auto">
                        <Link href="/" className="hover:text-foreground">
                           Dashboard
                        </Link>
                        <Link
                           href="/punetoret"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           Punëtoret
                        </Link>
                        <Link
                           href="/pagesat"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           Pagesat
                        </Link>

                        <Link
                           href="/raporti"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           Raporti
                        </Link>
                        <h3 className="text-center">Administrimi</h3>
                        {!token && (
                           <Link
                              href="/login"
                              className="text-muted-foreground hover:text-foreground"
                           >
                              Login
                           </Link>
                        )}

                        <Link
                           replace
                           href="/kompania"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           Komania
                        </Link>
                        <Link
                           href="/userDetail"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           User Detail
                        </Link>
                        <Link
                           href="#"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           <LogoutButton/>
                        </Link>
                        {/* <Link
                           href="/kompania"
                           className="text-muted-foreground hover:text-foreground"
                        >
                           Kompania
                        </Link> */}
                     </nav>
                  </SheetContent>
               </Sheet>
               <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                  {/* <form className="ml-auto flex-1 sm:flex-initial">
                     <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                           type="search"
                           placeholder="Search ..."
                           className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                     </div>
                  </form> */}
                  <h1>{user?.name }</h1>
                  <UserProfile />
               </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 min-w-screen w-full">
               {children}
            </main>
         </div>
      </div>
   );
}
