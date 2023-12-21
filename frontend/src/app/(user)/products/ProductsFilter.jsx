"use client";
import CheckBox from "@/common/CheckBox";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

function ProductsFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );
  // console.log(searchParams.getAll("category")[0].split(","));
  const createQueryString = useCallback(
    (name, value) => {
      console.log(searchParams)
      const params = new URLSearchParams(searchParams);
      console.log(params)
      params.set(name, value);
      //!(params.toString()=> example=  category=German%2CIran
      return params.toString();
    },
    [searchParams]
  );
//! this function is onChange handler of checkBox
//! every time that a checkBox selected or unselected=>this function implement
  const categoryHandler = (e) => {
    const value = e.target.value;
    //! if the checkBox thant checked is previous in selectedCategories state list
    //!=>remove it and update the state
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
       //! if the checkBox thant checked is previous not in selectedCategories state list
    //!=>add it and update the state
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };
  return (
    <div className="mb-8">
      <p className="font-bold mb-4">country</p>
      <ul className=" space-y-4">
        {categories.map((category) => {
          return (
            <CheckBox
              key={category._id}
              id={category._id}
              value={category.title}
              name="country"
              label={category.title}
              onChange={categoryHandler}
              checked={selectedCategories.includes(category.title)}
              labelTextcolor='text-text-white'
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ProductsFilter;
