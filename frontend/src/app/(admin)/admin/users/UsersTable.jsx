import { userListTableHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import Link from "next/link";
import { HiCheckCircle } from "react-icons/hi";

function UsersTable({ users }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userListTableHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="table__td">{index}</td>
                <td className="table__td  whitespace-nowrap">{user.name}</td>
                <td className="table__td">{user.email}</td>
                <td className="table__td">
                  <div className="flex whitespace-nowrap gap-x-2 items-center">
                    {user.phoneNumber}{" "}
                    {user.isVerifiedPhoneNumber && (
                      <HiCheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start">
                    {user.Products.map((product, index) => {
                      return (
                        <span className="badge badge--secondary" key={index}>
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td">
                  {toLocalDateStringShort(user.createdAt)}
                </td>
                <td className="table__td font-bold text-lg">
                  <Link href={`/admin/users/${user._id}`}>مشاهده جزییات</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default UsersTable;
