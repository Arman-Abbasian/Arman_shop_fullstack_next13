"use client";
import CheckBox from "@/common/CheckBox";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

function CategoriesFilter({ categories }) {
  //! for add query string in url we need to use 3 next client-hook and one function

  
  //! we use from router.push to change change the url(here add query string to url)
  const router = useRouter();
  //! get the current url address
  const pathname = usePathname();
  //! with this object, you access to some methods like get, getAll, ...
  const searchParams = useSearchParams();
  //! when you refresh the product page and from before you have choosed some checkbox
  //! this section=>( searchParams.get("category")?.split(",")) 
  //!get the category querystring section and add it to selectedCategories state
  //! cosequently check the previous checked items(before refresh) again in new page after refresh
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );
  // console.log(searchParams.getAll("category")[0].split(","));
  const createQueryString = useCallback(
    (name, value) => {
      //! in searchParams object we do not access set method so => we have to use URLSearchPrams class
      //! to use form set method 
      const params = new URLSearchParams(searchParams);
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
    //! if the checkBox that checked, is previous in selectedCategories state list
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
export default CategoriesFilter;
