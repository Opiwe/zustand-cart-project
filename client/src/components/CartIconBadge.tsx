import React from "react";

interface CartIconBadgeProps {
  itemCount: number;
}

export const CartIconBadge: React.FC<CartIconBadgeProps> = ({ itemCount }) => {
  return (
    <div className="relative">
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </div>
  );
};
