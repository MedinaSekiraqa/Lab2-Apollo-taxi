
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/type"

export function PersonalInfo({ user }: { user: User }) {
   return (
      <div className="bg-white shadow rounded-lg p-8  mx-auto">
         <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
         <p className="text-gray-600 mb-6">
            {user.userInfo || "Nuk ka pershkrim"}
         </p>
         <div className="grid gap-6">
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Full Name:</span>
               <span className="border w-full">{user.name} {user.lastName}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Mobile:</span>
               <span className="border w-full">{user.phone}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Email:</span>
               <span className="border w-full">{user.email}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Location:</span>
               <span className="border w-full">{user.address}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Paga:</span>
               <span className="border w-full">{user.salary} Euro</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800 ">Roli:</span>
               <span className="border w-full">{user.role} </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
               <span className="font-semibold text-gray-800">Orari:</span>
               <span className="border w-full">{user.orari} </span>
            </div>
         </div>

      </div>
   );
}
