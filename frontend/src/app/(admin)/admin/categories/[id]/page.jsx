'use client'

import Loading from "@/common/Loading";
import { dateFormatOptions } from "@/constants/dateFormatOption";
import { useGetCategoryById } from "@/hooks/useCategories";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const {isLoading,data}=useGetCategoryById(id)
  const {category}=data||{}

  if(isLoading) return <Loading />

  return (
  <div className="space-y-7"> 
  <h1 className="font-bold text-xl text-primary-800">Category</h1>
  <p><strong className="font-bold">name: </strong>{category.title}</p>
  <p><strong className="font-bold">description: </strong>{category.description}</p>
  <p><strong className="font-bold">category type: </strong>{category.type}</p>
  <p><strong className="font-bold">create at: </strong>{new Date(category.createdAt).toLocaleDateString("en-US",dateFormatOptions)}</p>
  <p><strong className="font-bold">last update at: </strong>{new Date(category.updatedAt).toLocaleDateString("en-US",dateFormatOptions)}</p>
</div>
)
}
export default page;
