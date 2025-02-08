"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const sanity = createClient({
  projectId: "pknoq409",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"]{
        _id,
        title,
        price,
        description,
        discountPercentage,
        "imageUrl": productImage.asset->url,
        tags
      }`;

      const data = await sanity.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncateDescription = (description: string) => {
    const maxLength = 80;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-center text-[#B88E2F] text-[40px] font-bold mt-4 mb-8">
        New Products Range
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <Link href={`/products/${product._id}`}>
                <div className="relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-56 object-cover rounded-md"
                  />
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                      {product.discountPercentage}% OFF
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {truncateDescription(product.description)}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-indigo-600">${product.price}</p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addToCart({ ...product, quantity: 1 })}
                className="mt-4 w-full bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F] hover:border-[#B88E2F] border-2 px-4 py-2 rounded-md transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCards;
