"use client";
import Loading from "@/common/Loading";
import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { includeObj } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const includesProductKey = [
  "title",
  "description",
  "slug",
  "brand",
  "price",
  "offPrice",
  "discount",
  "countInStock",
  "imageLink",
];

function page() {
  const { id } = useParams();
  const { data, isLoading: isLoadingProduct } = useGetProductById(id);
  const { product } = data || {};
  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [tags, setTags] = useState(product?.tags || []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isLoading, mutateAsync } = useUpdateProduct();

  const handChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      router.push("/admin/products");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (product) {
      setTags(product.tags);
      setSelectedCategory(product.category);
      setFormData(includeObj(product, includesProductKey));
    }
  }, [data]);

  if (isLoadingProduct) return <Loading />;
  return (
    <div>
      <h1 className="mb-6 font-bold text-xl">ویرایش اطلاعات محصول</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={product.category}
        tags={tags}
        setTags={setTags}
        isLoading={isLoading}
        productData={formData}
        productDataOnChange={handChange}
      />
    </div>
  );
}
export default page;
