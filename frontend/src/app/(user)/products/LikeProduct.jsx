"use client";

import { likeProduct } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
function LikeProduct({ product }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      router.refresh(pathname + "?" + searchParams.toString());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mb-2">
      <button onClick={likeHandler}>
        {product.isLiked ? (
          <AiFillLike className="fill-primary-900 w-6 h-6" />
        ) : (
          <AiOutlineLike className="text-secondary-700 w-6 h-6" />
        )}
      </button>
    </div>
  );
}
export default LikeProduct;
