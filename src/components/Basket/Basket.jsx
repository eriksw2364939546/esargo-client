'use client';
import { useState, useEffect } from 'react';
import './Basket.scss';
import { ShoppingCart, ShoppingBag, SquareX, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useBasket } from '@/services/serviceBasketContext/BasketContext';
import BasketItem from '../BasketItem/BasketItem';
import Link from 'next/link';

const Basket = ({ setIsBasketOpen }) => {
  const [open, setOpen] = useState(false);
  const tBasket = useTranslations("homePage.basket");
  const { basketItems, getTotalPrice, getItemsByRestaurant } = useBasket();

  useEffect(() => {
    if (open) {
      document.body.classList.add('fixed-body');
      setIsBasketOpen(true);
    } else {
      document.body.classList.remove('fixed-body');
      setIsBasketOpen(false);
    }
    return () => {
      document.body.classList.remove('fixed-body');
      setIsBasketOpen(false);
    };
  }, [open]);

  const itemsByRestaurant = getItemsByRestaurant();
  const totalPrice = getTotalPrice();

  const handleCheckoutClick = () => {
    setOpen(false); // Закрываем корзину при переходе на checkout
  };

  return (
    <>
      <button className="basket-toggle-btn head__btn" onClick={() => setOpen(true)}>
        <ShoppingCart size={18} />
        {basketItems.length > 0 && (
          <span className="basket-badge">{basketItems.length}</span>
        )}
      </button>

      <aside className={`basket-panel ${open ? 'open' : ''}`}>
        <div className="basket-header">
          <div className="header-item__wrapper row">
            <ShoppingBag />
            <h3>{tBasket("headText")} ({basketItems.length})</h3>
          </div>
          <button className="close-btn head__btn" onClick={() => setOpen(false)}>
            <SquareX size={20} />
          </button>
        </div>

        <div className="basket-content">
          {basketItems.length === 0 ? 
             <div className="empty-basket">
               <ShoppingBag size={50} />
               <p><b>{tBasket("contentText1")}</b><br /> {tBasket("contentText2")}</p>
             </div>
           : 
            <>
              <div className="basket-items-wrapper">
                {Object.entries(itemsByRestaurant).map(([restaurantName, items]) => (
                  <div key={restaurantName} className="restaurant-group">
                    <h4 className="restaurant-name">{restaurantName}</h4>
                    {items.map((item) => (
                      <BasketItem key={item.id} item={item} />
                    ))}
                    <div className="restaurant-subtotal">
                      <span>Sous-total {restaurantName}</span>
                      <span>{items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}€</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="basket-footer">
                <div className="basket-total">
                  <span className="total-label">Total</span>
                  <span className="total-price">{totalPrice.toFixed(2)}€</span>
                </div>
                
                <Link 
                  href="/checkout" 
                  className="checkout-btn btn"
                  onClick={handleCheckoutClick}
                >
                  <span>Оформить заказ</span>
                  <ArrowRight size={16} />
                </Link>
                
                {/* <button className="clear-basket-btn">
                  Vider le panier
                </button> */}
              </div>
            </>
          }
        </div>
      </aside>

      {open && <div className="basket-overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Basket;