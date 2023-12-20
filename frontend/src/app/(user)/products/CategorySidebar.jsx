'use client'
import { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";
import {FiChevronUp} from "react-icons/fi";

function CategorySidebar({ categories }) {
  const [show,setShow]=useState(false)
  return (
    <>
    <span onClick={()=>setShow(!show)} className="bg-primary-900 rounded-md flex justify-end items-center md:hidden p-1 cursor-pointer">
      <FiChevronUp className={` ${!show?'transition-all duration-300 rotate-0':'transition-all duration-300 rotate-180'} text-text-white`} />
      </span>
    <div className={`bg-primary-900 md:h-[calc(100vh-10rem)] ${show?'block':'hidden'} md:block rounded-md shadow-md text-white`}>
    <div className="p-4">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
    </div>
    </>
  );
}
export default CategorySidebar;
