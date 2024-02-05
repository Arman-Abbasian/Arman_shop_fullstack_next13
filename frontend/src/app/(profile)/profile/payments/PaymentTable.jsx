import { userPaymentTHeads } from "@/constants/tableHeads";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toNumbersWithComma, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

function PaymentTable({ payments }) {
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {userPaymentTHeads.map((item) => {
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
                <td className="table__td"><p className="tdItem--table">{index}</p></td>
                <td className="table__td  whitespace-nowrap truncate">
                <p className="tdItem--table">{payment.invoiceNumber}</p>
                </td>
                <td className="table__td  max-w-[280px] whitespace-nowrap truncate">
                <p className="tdItem--table">{payment.description}</p>
                </td>
                <td className="table__td">
                  <div className="flex flex-col items-center gap-y-2">
                    {payment.cart.productDetail.map((product) => {
                      return (
                        <span
                          className="badge badge--secondary tdItem--table"
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
                <p className="tdItem--table">{payment.createdAt}</p>
                </td>
                <td className="table__td">
                  {payment.status === "COMPLETED" ? (
                    <span className="badge badge--success tdItem--table">success</span>
                  ) : (
                    <span className="badge badge--error tdItem--table">unsuccess</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentTable;
