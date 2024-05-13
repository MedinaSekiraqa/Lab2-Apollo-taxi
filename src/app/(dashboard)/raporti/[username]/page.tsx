import { RaportiShoferit } from "@/lib/type";
import { fetchRaportiShoferitByUser } from "@/utils/queries";
import { RaportiDitorTable } from "@/components/component/raporti-ditor-table";
import { RaportiShoferitTable } from "@/components/tables/raportiShoferit/raportiSh-table";
import { RaportiShoferitUsernameTable } from "@/components/tables/raportiShoferit/raportiSh-username-table";


export default async function RaportiShoferitByUsername({
   params,
}: {
   params: { username: string };
}) {
   const raporti: RaportiShoferit[] = await fetchRaportiShoferitByUser(
      params.username
   );
   // console.log(params.username)
   return (
      <div>
         <RaportiShoferitUsernameTable data={raporti} />
      </div>
   );
}
