"use client";

import "./AddToBasketButton.scss";
import { useBasket } from "@/services/serviceBasketContext/BasketContext";
import { ArrowRight } from "lucide-react";

const AddToBasketButton = ({ 
  product, 
  selectedSize, 
  quantity, 
  totalPrice, 
  onSuccess,
  restaurantName 
}) => {
  const { addToBasket } = useBasket();

  const handleAddToBasket = () => {
    const basketItem = {
      productId: product._id,
      name: product.name,
      price: totalPrice / quantity,
      size: selectedSize,
      quantity: quantity,
      total: totalPrice,
      image: product.images?.[0] || "/assets/img/product-image2.webp",
      restaurantName: restaurantName || "Ресторан"
    };
    
    addToBasket(basketItem);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <button 
      className="add-to-basket-btn btn"
      onClick={handleAddToBasket}
    >
      <span>Добавить в корзину - {totalPrice.toFixed(2)}€</span>
      <ArrowRight size={16} />
    </button>
  );
};

export default AddToBasketButton;