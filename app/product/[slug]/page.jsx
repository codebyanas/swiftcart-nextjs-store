'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { posts } from '@/data/posts';

const ProductDetail = ({ params: { slug } }) => {
  const product = posts.find((item) => item.slug === slug);
  const router = useRouter();

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-red-600">Product not found!</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 mt-4 text-white bg-gray-800 rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full max-w-md mx-auto rounded-lg"
      />
      <p className="mt-4 text-lg text-red-600">Price: ${product.price}</p>
      <p className="mt-2 text-sm text-gray-700">Rating: {product.rating}</p>
    </div>
  );
};

export default ProductDetail;
