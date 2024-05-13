// "use client"

// import { useEffect, useState } from "react"
// import { CreateUserModal } from "@/components/modals/create-user-modal"
// import { CreateKategoriaShpenzimeveModal } from "@/components/modals/create-kategoria-shpenzimeve-modal";

// export const KategoriaShepnzimeveModalProvider = () =>{
//     const [isMounted, setIsMounted] =useState(false);

//     useEffect(() =>{
//         setIsMounted(true);
//     },[]);

//     if (!isMounted) {
//         return null;
//     }

//     return (
//         <>
//             <CreateKategoriaShpenzimeveModal  />
//         </>
//     )
// }