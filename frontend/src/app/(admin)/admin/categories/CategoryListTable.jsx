import { categoryListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CategoryListTable({ categories }) {
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();
  
  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {categoryListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  <p className="flex justify-center items-center bg-red-400">{item.label}</p>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr key={category._id}>
                <td className="table__td"><p className="tdItem--table">{index + 1}</p></td>
                <td className="table__td  font-bold">
                 <p className="tdItem--table">{category.title}</p> 
                </td>
                <td className="table__td"><p className="tdItem--table">{category.description}</p></td>
                <td className="table__td">
                  <span className="badge badge--secondary tdItem--table">
                    {category.type}
                  </span>
                </td>
                <td className="table__td font-bold text-lg">
                    <Link href={`/admin/categories/${category._id}`} className="tdItem--table">
                      <HiEye className="text-primary-900 w-6 h-6" />
                    </Link>
                   </td>
                   <td> 
                    <Link href={`/admin/categories/edit/${category._id}`} className="tdItem--table">
                      <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                    </Link>
                    </td>
                    <td>
                    <button onClick={() => removeCategoryHandler(category._id)} className="tdItem--table w-full">
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
export default CategoryListTable;
