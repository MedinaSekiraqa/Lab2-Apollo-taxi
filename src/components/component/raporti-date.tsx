import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
   SelectValue,
   SelectTrigger,
   SelectItem,
   SelectContent,
   Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchRaportiShoferit } from "@/utils/queries";
import { RaportiShoferit } from "@/lib/type";
import { RaportiDitorTable } from "./raporti-ditor-table";
import { RaportiShoferitTable } from "../tables/raportiShoferit/raportiSh-table";

export async function RaportiDate() {
   const raporti: RaportiShoferit[] = await fetchRaportiShoferit();
   // console.log(raporti)
   return (
      <div className="min-w-screen ">
         <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm ">
            <form>
               <div className="space-y-4">
                  <div className="flex flex-col">
                     <Label htmlFor="from-date">Prej:</Label>
                     <Input
                        id="from-date"
                        placeholder="01/02/2024"
                        type="text"
                     />
                  </div>
                  <div className="flex flex-col">
                     <Label htmlFor="to-date">Deri:</Label>
                     <Input id="to-date" placeholder="01/03/2024" type="text" />
                  </div>
                  <div className="flex flex-col">
                     <Label htmlFor="taxi">Taksisti:</Label>
                     <Select>
                        <SelectTrigger id="taxi">
                           <SelectValue placeholder="Te Gjithe" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="all">Te Gjithe</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="flex flex-col">
                     <Label htmlFor="role">Roli:</Label>
                     <Select>
                        <SelectTrigger id="role">
                           <SelectValue placeholder="Primar" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="primary">Primar</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <Button className="bg-red-600 text-white w-full">
                     Kerko
                  </Button>
               </div>
            </form>
         </div>
         <div className=" overflow-x-auto">
         {/* {raporti.map((item) => (
              <div key={item.id}>
                 <div>{item.pranoi}</div>
                 <div>{item.dorzoi}</div>
                 <div>{item.paushall}</div>
                 <div>{item.minus}</div>
                 <div>{item.pershkrimi}</div>
                 <div>{item.shpenzimetId}</div>
                 <div>{item.veturaId}</div>
                 <div>{item.user.name}</div>
                 <div>{item.startTime}</div>
                 <div>{item.endTime}</div>
              </div>
           ))} */}
         <RaportiShoferitTable />
         </div>
      </div>
   );
}
