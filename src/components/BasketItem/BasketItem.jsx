"use client";

import "./BasketItem.scss";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import { useBasket } from "@/services/serviceBasketContext/BasketContext";

const BasketItem = ({ item }) => {
  const { updateQuantity, removeFromBasket } = useBasket();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromBasket(item.id);
  };

  return (
    <div className="basket-item">
      <div className="basket-item__image">
        <Image
          src="/assets/img/product-image2.webp"
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="basket-item__content">
        <div className="basket-item__header">
          <h4 className="basket-item__name">{item.name}</h4>
          <button className="basket-item__remove" onClick={handleRemove}>
            <X size={16} />
          </button>
        </div>

        <div className="basket-item__price">
          {item.total.toFixed(2)}€
        </div>

        {item.size && item.size !== "default" && (
          <div className="basket-item__size">
            {item.size}
          </div>
        )}

        <div className="basket-item__controls">
          <button 
            className="quantity-btn"
            onClick={handleDecrease}
            disabled={item.quantity <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={handleIncrease}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;