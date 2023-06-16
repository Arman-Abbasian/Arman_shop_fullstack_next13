"use client";

import { useState } from "react";
import { useAddCategory } from "@/hooks/useCategories";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import CategoryForm from "@/components/CategoryForm";

function page() {
  const [category, setCategory] = useState({
    title: "",
    description: "",
    englishTitle: "",
  });
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const { isLoading, mutateAsync } = useAddCategory();
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...category,
        type: selectedType.value,
      });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <h1 className="mb-6 font-bold text-xl">افزودن دسته بندی جدید</h1>
      <CategoryForm
        category={category}
        handleChange={handleChange}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </div>
  );
}
export default page;
