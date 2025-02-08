"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

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

const SearchProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
      setFilteredProducts(data); // Initialize filtered products
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
  };

  useEffect(() => {
    let filtered = products;

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }

    // Category Filter
    if (category !== "all") {
      filtered = filtered.filter((product) => product.tags.includes(category));
    }

    // Price Filter
    filtered = filtered.filter((product) => {
      if (priceRange === "low") return product.price < 50;
      if (priceRange === "medium") return product.price >= 50 && product.price <= 150;
      if (priceRange === "high") return product.price > 150;
      return true; // "all" case
    });

    setFilteredProducts(filtered);
  }, [searchQuery, category, priceRange, products]);

  return (
    <div className="p-4">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="all">All Prices</option>
          <option value="low">Under $50</option>
          <option value="medium">$50 - $150</option>
          <option value="high">Above $150</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-blue-950 mt-2 text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-orange-500">
                      {product.discountPercentage}% OFF
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
