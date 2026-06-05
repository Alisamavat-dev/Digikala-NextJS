"use client";

import Carousel from '@/ui/carousel';
import { useQuery } from '@tanstack/react-query';

export default function ShegeftAngiz() {
  const { data: response, isLoading, error } = useQuery({
    queryKey: ['amazingOffers'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/'); 
      if (!res.ok) throw new Error('خطا در دریافت اطلاعات');
      return res.json();
    },
  });

  const products = response?.data || response?.products || response || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  const productCards = products.map((product) => (
    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative">
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold z-10">
          {product.discount}% تخفیف
        </div>
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {product.subtitle}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 line-through text-sm">
              {product.oldPrice?.toLocaleString()} تومان
            </span>
            <span className="text-red-500 font-bold text-sm">
              {product.discount}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">
              {product.newPrice?.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm">تومان</span>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
          مشاهده و خرید
        </button>
      </div>
    </div>
  ));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-red-500 w-2 h-8 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">پیشنهاد شگفت‌انگیز</h2>
          <span className="text-sm text-gray-500 mr-2">12:46</span>
        </div>
        <button className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
          مشاهده همه
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel */}
      <Carousel
        slideperview={1}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        slideclassname="px-2"
      >
        {productCards}
      </Carousel>
    </div>
  );
}