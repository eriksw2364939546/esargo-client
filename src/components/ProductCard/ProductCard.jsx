"use client";

import "./ProductCard.scss";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

const ProductCard = ({ price, images, name, description, category, onAddClick }) => {
  const handleAddClick = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    if (onAddClick) {
      onAddClick();
    }
  };

  return (
    <div className="product-card">
      <div className="product__card-image__wrapper">
        <p className="product__popular">Популярно</p>
        <Image
          className="product__card-img"
          src={images}
          alt={`Изображение ${name}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="product-card__bottom">
        <h4 className="card__bottom-title">{name}</h4>
        <p className="card__bottom-descr" title={description}>{description}</p>
        <div className="product-card__bottom-elems row">
          <p className="product-card__price">{price} €</p>
          <button 
            className="product-card__add-btn btn"
            onClick={handleAddClick}
          >
            <Plus size={16} />
            <p>Добавить</p>
          </button>
        </div>
          <p className="product-card__category">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;