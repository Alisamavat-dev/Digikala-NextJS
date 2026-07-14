"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function ButtonShop({ maxQuantity = 10 }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);

    if (isNaN(value)) {
      value = 1;
    }

    if (value > maxQuantity) {
      value = maxQuantity;
    }

    if (value < 1) {
      value = 1;
    }

    setQuantity(value);
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        تعداد:
      </label>
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={decreaseQuantity}
            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            min="1"
            max={maxQuantity}
            disabled
            className="w-16 h-10 text-center border-x border-gray-300 outline-none focus:ring-1 focus:ring-red-500"
          />

          <button
            onClick={increaseQuantity}
            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={quantity >= maxQuantity}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
