import { RaportiShoferit } from "@/lib/type";
import Link from "next/link";

export function RaportiDitorTable({ data }:{data:RaportiShoferit[]}) {
  return (
    <div className=" mx-auto  py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Reports</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Pranoi</th>
              <th className="px-4 py-3 text-left font-medium">Dorzoi</th>
              <th className="px-4 py-3 text-left font-medium">Paushall</th>
              <th className="px-4 py-3 text-left font-medium">Minus</th>
              <th className="px-4 py-3 text-left font-medium">Username</th>
              <th className="px-4 py-3 text-left font-medium">Data</th>
              <th className="px-4 py-3 text-left font-medium">Orari</th>
              <th className="px-4 py-3 text-left font-medium">Fillimi</th>
              <th className="px-4 py-3 text-left font-medium">Mbarimi</th>
              <th className="px-4 py-3 text-left font-medium">Vetura</th>
              <th className="px-4 py-3 text-left font-medium">Emri</th>
              <th className="px-4 py-3 text-left font-medium">Mbiemri</th>
              <th className="px-4 py-3 text-left font-medium">Tel.</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Rroga</th>
            </tr>
          </thead>
          <tbody>
                  {data.map((record, index) => (
                     <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700"
                     >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{record.pranoi}</td>
                        <td className="px-4 py-3">{record.dorzoi}</td>
                        <td className="px-4 py-3">{record.paushall}</td>
                        <td className="px-4 py-3">{record.minus}</td>
                        <td className="px-4 py-3"><Link href={`/raporti/${record.user.username}`}>{record.user.username}</Link></td>
                        <td className="px-4 py-3">{new Date(record.data).toLocaleDateString(
                                    "en-GB",
                                    {
                                       year: "numeric",
                                       month: "short",
                                       day: "2-digit",
                                    }
                                 )}</td>
                        <td className="px-4 py-3">{record.user.orari}</td>
                        <td className="px-4 py-3">{record.startTime}</td>
                        <td className="px-4 py-3">{record.endTime}</td>
                        <td className="px-4 py-3">{record.vetura.name}</td>
                        <td className="px-4 py-3">{record.user.name}</td>
                        <td className="px-4 py-3">{record.user.lastName}</td>
                        <td className="px-4 py-3">{record.user.phone}</td>
                        <td className="px-4 py-3">{record.user.role}</td>
                        <td className="px-4 py-3">{record.user.salary}</td>
                     </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
