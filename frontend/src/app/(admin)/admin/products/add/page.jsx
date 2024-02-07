"use client";

import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function AddProductPage() {
  const { data } = useGetCategories();
  // we write 'data || {}' because at the first time data is empty because
  //usetGetCategories is a async action and with this code we provent the error
  const { categories } = data || {};
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    offPrice: "",
    discount: "",
    countInStock: "",
    imageLink: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log({ formData, tags, selectedCategory });
  const { isLoading: addProductLaoding, mutateAsync } = useAddProduct();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      router.push("/admin/products");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mb-10">
      <h1 className="mb-4 font-bold text-xl">add new product</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        setTags={setTags}
        isLoading={addProductLaoding}
        productData={formData}
        productDataOnChange={handleChange}
        buttonText="Add"
      />
    </div>
  );
}
export default AddProductPage;
