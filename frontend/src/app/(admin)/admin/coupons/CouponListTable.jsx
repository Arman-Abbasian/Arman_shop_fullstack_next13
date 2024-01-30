import { couponListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupons";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CouponListTable({ coupons }) {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {couponListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  <p className="tdItem--table">{item.label}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr key={coupon._id}>
                <td className="table__td"> <p className="tdItem--table">{index + 1}</p></td>
                <td className="table__td  whitespace-nowrap font-bold">
                <p className="tdItem--table">{coupon.code}</p>
                </td>
                <td className="table__td"> <p className="tdItem--table">{coupon.amount}</p></td>
                <td className="table__td">
                  <span className="badge badge--primary tdItem--table">{coupon.type}</span>
                </td>
                <td className="table__td">
                  <div className="space-y-2 flex flex-col items-center">
                    {coupon.productIds.map((p) => {
                      return (
                        <span className="badge badge--secondary tdItem--table">
                          {p.title}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="table__td"> <p className="tdItem--table">{coupon.usageCount}</p></td>
                <td className="table__td"> <p className="tdItem--table">{coupon.usageLimit}</p></td>
                <td className="table__td">
                <p className="tdItem--table"> {toLocalDateStringShort(coupon.expireDate)}</p>
                </td>
                <td className="table__td">
                <Link href={`/admin/coupons/${coupon._id}`} className="tdItem--table">
                      <HiEye className="text-primary-900 w-6 h-6" />
                    </Link>
                </td>
                <td className="table__td">
                <button onClick={() => removeCouponHandler(coupon._id)} className="tdItem--table w-full">
                      <HiTrash className="text-rose-600 w-6 h-6" />
                    </button>
                </td>
                  <td className="table__td">
                  <Link href={`/admin/coupons/edit/${coupon._id}`} className="tdItem--table">
                      <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                    </Link>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default CouponListTable;
