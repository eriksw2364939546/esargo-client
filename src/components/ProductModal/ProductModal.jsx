"use client";

import "./ProductModal.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { getMenuItemById } from "@/services/serviceRestorant";
import AddToBasketButton from "../AddToBasketButton/AddToBasketButton";

const ProductModal = ({ isOpen, onClose, productId, restaurantName }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Сбрасываем состояние при открытии модального окна или смене товара
  useEffect(() => {
    if (isOpen && productId) {
      // ВАЖНО: Сбрасываем количество в 1 при каждом открытии/смене товара
      setQuantity(1);
      setProduct(null);
      setSelectedSize("");
      setTotalPrice(0);
      fetchProduct();
    }
  }, [isOpen, productId]);

  // Также сбрасываем состояние при закрытии модального окна
  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
      setProduct(null);
      setSelectedSize("");
      setTotalPrice(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (product && selectedSize) {
      calculateTotal();
    }
  }, [product, selectedSize, quantity]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await getMenuItemById(productId);
      setProduct(data.item);
      
      // Устанавливаем первый доступный размер по умолчанию
      if (data.item.sizes && data.item.sizes.length > 0) {
        setSelectedSize(data.item.sizes[0].name);
      } else {
        setSelectedSize("default");
      }
    } catch (error) {
      console.error("Ошибка при загрузке продукта:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!product) return;

    let basePrice = product.price;
    
    if (product.sizes && product.sizes.length > 0) {
      const size = product.sizes.find(s => s.name === selectedSize);
      if (size) {
        basePrice = size.price;
      }
    }

    setTotalPrice(basePrice * quantity);
  };

  const handleSizeChange = (sizeName) => {
    setSelectedSize(sizeName);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleClose = () => {
    // Сбрасываем состояние при закрытии
    setQuantity(1);
    setProduct(null);
    setSelectedSize("");
    setTotalPrice(0);
    onClose();
  };

  const handleAddSuccess = () => {
    // При успешном добавлении в корзину также сбрасываем состояние
    setQuantity(1);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="product-modal-overlay" onClick={handleClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">
            <p>Загрузка...</p>
          </div>
        ) : product ? (
          <>
            <div className="modal-header">
              <h2 className="modal-title">{product.name}</h2>
            </div>

            <div className="modal-image">
              <Image
                src="/assets/img/product-image2.webp"
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="modal-content">
              <p className="product-description">
                {product.description || "Классическое блюдо с натуральными ингредиентами"}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="size-selection">
                  <h3 className="selection-title">
                    Taille <span className="required">*</span>
                  </h3>
                  <div className="size-options">
                    {product.sizes.map((size, index) => (
                      <label key={index} className="size-option">
                        <input
                          type="radio"
                          name="size"
                          value={size.name}
                          checked={selectedSize === size.name}
                          onChange={() => handleSizeChange(size.name)}
                        />
                        <span className="size-label">
                          {size.name} 
                          {size.price !== product.price && (
                            <span className="size-price">
                              (+{(size.price - product.price).toFixed(2)}€)
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="quantity-section">
                <h3 className="selection-title">Quantité</h3>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={increaseQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <div className="total-section">
                  <span className="total-label">Total</span>
                  <span className="total-price">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <AddToBasketButton
                  product={product}
                  selectedSize={selectedSize}
                  quantity={quantity}
                  totalPrice={totalPrice}
                  restaurantName={restaurantName}
                  onSuccess={handleAddSuccess}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="modal-error">
            <p>Не удалось загрузить информацию о продукте</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;