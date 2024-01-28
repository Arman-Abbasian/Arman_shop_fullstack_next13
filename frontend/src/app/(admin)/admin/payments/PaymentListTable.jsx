import { adminPaymentListTableTHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toNumbersWithComma } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { HiEye } from "react-icons/hi";

function PaymentListTable({ payments }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {adminPaymentListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                 <p className="tdItem--table">{item.label}</p> 
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => {
            return (
              <tr key={payment._id}>
                <td className="table__td"><p className="tdItem--table">{index + 1}</p></td>
                <td className="table__td  whitespace-nowrap truncate">
                <p className="tdItem--table">{payment.invoiceNumber}</p>
                </td>
                <td className="table__td  max-w-[280px] whitespace-nowrap truncate">
                <p className="tdItem--table">{payment.description}</p>
                </td>
                <td className="table__td  whitespace-nowrap truncate tdItem--table">
                  <div className="flex flex-col gap-y-2">
                    <span> {payment.user.name}</span>
                    <span> {payment.user.email}</span>
                    <span className="font-bold">
                      {payment.user.phoneNumber}
                    </span>
                  </div>
                </td>
                <td className="table__td">
                  <div className="flex flex-col gap-y-2 items-start tdItem--table">
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <span
                          className="badge badge--secondary"
                          key={product._id}
                        >
                          {product.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td font-bold text-lg">
                <p className="tdItem--table">{toNumbersWithComma(payment.amount)}</p> 
                </td>
                <td className="table__td">
                <p className="tdItem--table">{toLocalDateStringShort(payment.createdAt)}</p> 
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success tdItem--table">successful</span>
                  ) : (
                    <span className="badge badge--error tdItem--table">unsuccessful</span>
                  )}
                </td>
                <td>
                  <div>
                    <Link
                      href={`/admin/payments/${payment._id}`}
                      className="flex justify-center tdItem--table"
                    >
                      <HiEye className="w-6 h-6 text-primary-900" />
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentListTable;
