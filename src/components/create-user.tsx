import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export function CreateUser() {
  return (
   <div className="mt-10 flex-grow mb-10">
   <Card className="max-w-2xl mx-auto">
     <CardHeader>
       <CardTitle>Admin User Management</CardTitle>
       <CardDescription>Enter user details to create a new user</CardDescription>
     </CardHeader>
     <CardContent>
       <div className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
             <Label htmlFor="first-name">First name</Label>
             <Input id="first-name" placeholder="John" required />
           </div>
           <div className="space-y-2">
             <Label htmlFor="last-name">Last name</Label>
             <Input id="last-name" placeholder="Doe" required />
           </div>
         </div>
         <div className="space-y-2">
           <Label htmlFor="email">Email</Label>
           <Input id="email" placeholder="johndoe@example.com" required type="email" />
         </div>
         <div className="space-y-2">
           <Label htmlFor="password">Password</Label>
           <Input id="password" required type="password" />
         </div>
         <div className="space-y-2">
           <Label htmlFor="role">Role</Label>
           <Select  required>
             <SelectTrigger>
               <SelectValue placeholder="Select a role" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                 <SelectLabel>Roles</SelectLabel>
                 <SelectItem value="admin">Admin</SelectItem>
                 <SelectItem value="user">User</SelectItem>
               </SelectGroup>
             </SelectContent>
           </Select>
         </div>
       </div>
     </CardContent>
     <CardFooter>
       <Button className="w-full" type="submit">
         Create User
       </Button>
     </CardFooter>
   </Card>
 </div>
  )
}
