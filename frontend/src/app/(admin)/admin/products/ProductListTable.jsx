import { productListTableTHeads } from "@/constants/tableHeads";
import Link from "next/link";
import { RiEdit2Line } from "react-icons/ri";
import { HiEye, HiTrash } from "react-icons/hi";
import { useRemoveProduct } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function ProductListTable({ products }) {
  const { mutateAsync } = useRemoveProduct();
  const queryClient = useQueryClient();

  const removeProductHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };
  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                 <p className="flex justify-center items-center">{item.label}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td className="table__td"><p className="tdItem--table">{index + 1}</p></td>
                <td className="table__td  font-bold">
                  {product.title}
                </td>
                <td className="table__td"><p className="tdItem--table">{product.category.title}</p></td>
                <td className="table__td"><p className="tdItem--table">{product.price}</p></td>
                <td className="table__td"><p className="tdItem--table">{product.discount}</p></td>
                <td className="table__td"><p className="tdItem--table">{product.offPrice}</p></td>
                <td className="table__td"><p className="tdItem--table">{product.countInStock}</p></td>
                <td className="table__td font-bold text-lg">
                    <Link href={`/admin/products/${product._id}`} className="tdItem--table">
                      <HiEye className="text-primary-900 w-6 h-6" />
                    </Link>
                    </td>
                    <td>
                <Link href={`/admin/products/edit/${product._id}`} className="tdItem--table">
                <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                    </Link>
                    </td>
                    <td>
                    <button onClick={() => removeProductHandler(product._id)} className="w-full tdItem--table">
                    <HiTrash className="text-rose-600 w-6 h-6" />
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductListTable;

