"use client";

import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "latest",
  },
  {
    id: 2,
    value: "earliest",
    label: "earliest",
  },
  {
    id: 3,
    value: "popular",
    label: "most popular",
  },
];

function ProductsSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort")||"latest");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  useEffect(() => {
    console.log(sort)
    setSort(searchParams.get("sort") || "latest");
  }, [searchParams]);

  return (
    <div>
      <p className="font-bold mb-4">sort</p>
      {sortOptions.map((item) => {
        return (
          <RadioInput
            id={item.id}
            key={item.id}
            label={item.label}
            name="sort"
            value={item.value}
            checked={sort == item.value}
            onChange={sortHandler}
          />
        );
      })}
    </div>
  );
}
export default ProductsSort;
