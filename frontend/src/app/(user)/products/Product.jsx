import { toLocalDateStringShort } from '@/utils/toLocalDate'
import Link from 'next/link'
import React from 'react'
import LikeProduct from './LikeProduct'
import AddToCart from './[slug]/AddToCart'

function Product({product}) {
  const numOfLikes=(product.likes.length)
  return (
    <div
                  className="w-72 rounded-xl shadow-lg p-4 shadow-primary-400"
                  key={product._id}
                >
                  <div class="aspect-w-16 aspect-h-9">
                    <img src={product.imageLink} alt={product.title}class="w-full h-full object-center object-contain" />
                  </div>
                  <h2 className="font-bold text-xl mb-4">{product.title}</h2>
                  <div className="mb-4 flex gap-2 items-center">
                    <span>Date: </span>
                    <span className="font-bold">
                      {toLocalDateStringShort(product.createdAt)}
                    </span>
                  </div>
                  <Link
                    className="text-primary-900 font-bold mb-4 block"
                    href={`/products/${product.slug}`}
                  >
                 product details
                  </Link>
                  <div className='flex items-center gap-1 mb-2 '>
                  <LikeProduct product={product} />
                  <p className='text-secondary-500 text-xs'>{numOfLikes}</p>
                  </div>
                  <AddToCart product={product} />
                </div>
  )
}

export default Product