import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
//import VeturatTable from "./veturatTable";
import UserTable from "./tables/user/user-table";
import KategoriaTable from "./tables/kategoriaEShpenzimeve/kategoria-table";
import ShpenzimetTable from "./tables/shpenzimet/shpenzimet-table";
import VeturaTable from "./tables/vetura/vetura-table";
import { RaportiShoferitTable } from "./tables/raportiShoferit/raportiSh-table";

export default function KompaniaPage() {
   return (
      <div className="w-full min-w-screen overflow-x-auto">
         {/* <KategoriteEShpenzimeve /> */}
         {/* <ShpenzimetTable /> */}
         
           
       
         <Tabs defaultValue="veturat" className="w-full  min-w-screen">
             
            <TabsList>
               <TabsTrigger value="users">Users</TabsTrigger>
               <TabsTrigger value="kategoriteeshpenzimeve">
                  Kategorite E shpenzimeve
               </TabsTrigger>
               <TabsTrigger value="shpenzimet">Shpenzimet</TabsTrigger>
               <TabsTrigger value="veturat">Veturat</TabsTrigger>
               <TabsTrigger value="raportishoferit">Raporti</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
               <UserTable />
            </TabsContent>
            <TabsContent value="kategoriteeshpenzimeve">
               <KategoriaTable />
            </TabsContent>
            <TabsContent value="shpenzimet">
               <ShpenzimetTable />
            </TabsContent>
            <TabsContent value="veturat">
               <VeturaTable />
            </TabsContent>
            <TabsContent value="raportishoferit">
               <RaportiShoferitTable />
            </TabsContent>
         </Tabs>
      </div>
   );
}
