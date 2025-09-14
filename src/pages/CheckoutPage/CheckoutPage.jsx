"use client";

import "./CheckoutPage.scss";
import { useState } from "react";
import { ArrowLeft, Plus, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBasket } from "@/services/serviceBasketContext/BasketContext";

const CheckoutPage = () => {
  const router = useRouter();
  const { basketItems, getTotalPrice, getItemsByRestaurant } = useBasket();
  
  // Состояния для формы
  const [selectedAddressType, setSelectedAddressType] = useState("home");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [deliveryType, setDeliveryType] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  // Состояния для данных формы
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    zipCode: ""
  });
  
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });
  
  const [specialInstructions, setSpecialInstructions] = useState("");

  const itemsByRestaurant = getItemsByRestaurant();
  const totalPrice = getTotalPrice();

  const handleAddressInputChange = (field, value) => {
    setAddressData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardInputChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = () => {
    // Логика отправки заказа
    console.log("Заказ отправлен:", {
      items: basketItems,
      address: addressData,
      deliveryType,
      paymentMethod,
      cardData: paymentMethod === "card" ? cardData : null,
      specialInstructions,
      total: totalPrice
    });
    alert("Заказ оформлен!");
  };

  if (basketItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h2>Корзина пуста</h2>
            <button onClick={() => router.push("/")} className="back-btn">
              Вернуться к покупкам
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <button onClick={() => router.back()} className="back-button">
          <ArrowLeft size={20} />
          Назад
        </button>
        
        <h1 className="checkout-title">Оформить заказ</h1>

        <div className="checkout-content">
          <div className="checkout-left">
            {/* Адрес доставки */}
            <section className="checkout-section">
              <h2 className="section-title">
                <span className="location-icon">📍</span>
                Адрес доставки
              </h2>
              
              <div className="address-options">
                <label className="address-option">
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={selectedAddressType === "home"}
                    onChange={(e) => setSelectedAddressType(e.target.value)}
                  />
                  <div className="address-content">
                    <span className="address-label">Дом</span>
                    <span className="address-text">123 Rue de la Paix, Paris 75001</span>
                    <span className="address-tag">По умолчанию</span>
                  </div>
                </label>

                <label className="address-option">
                  <input
                    type="radio"
                    name="addressType"
                    value="office"
                    checked={selectedAddressType === "office"}
                    onChange={(e) => setSelectedAddressType(e.target.value)}
                  />
                  <div className="address-content">
                    <span className="address-label">Офис</span>
                    <span className="address-text">456 Avenue des Champs-Élysées, Paris 75008</span>
                  </div>
                </label>
              </div>

              <button 
                className="add-address-btn"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                <Plus size={16} />
                Добавить адрес
              </button>

              {showAddressForm && (
                <div className="address-form">
                  <input
                    type="text"
                    placeholder="Улица и номер дома"
                    value={addressData.street}
                    onChange={(e) => handleAddressInputChange("street", e.target.value)}
                    className="address-input"
                  />
                  <input
                    type="text"
                    placeholder="Город"
                    value={addressData.city}
                    onChange={(e) => handleAddressInputChange("city", e.target.value)}
                    className="address-input"
                  />
                  <input
                    type="text"
                    placeholder="Почтовый индекс"
                    value={addressData.zipCode}
                    onChange={(e) => handleAddressInputChange("zipCode", e.target.value)}
                    className="address-input"
                  />
                  <button 
                    className="save-address-btn"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Сохранить адрес
                  </button>
                </div>
              )}
            </section>

            {/* Время доставки */}
            <section className="checkout-section">
              <h2 className="section-title">
                <span className="clock-icon">🕐</span>
                Время доставки
              </h2>
              
              <div className="delivery-options">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="asap"
                    checked={deliveryType === "asap"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <span>Как можно скорее</span>
                </label>

                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryType"
                    value="scheduled"
                    checked={deliveryType === "scheduled"}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <span>Запланировать доставку</span>
                </label>
              </div>

              {deliveryType === "scheduled" && (
                <div className="schedule-form">
                  <div className="schedule-inputs">
                    <div className="input-group">
                      <label>Дата</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="schedule-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Время</label>
                      <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="schedule-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Способ оплаты */}
            <section className="checkout-section">
              <h2 className="section-title">
                <CreditCard size={20} />
                Способ оплаты
              </h2>
              
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Банковская карта</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>PayPal</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-form">
                  <input
                    type="text"
                    placeholder="Номер карты"
                    value={cardData.number}
                    onChange={(e) => handleCardInputChange("number", e.target.value)}
                    className="card-input"
                  />
                  <div className="card-row">
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      value={cardData.expiry}
                      onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                      className="card-input card-input-small"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                      className="card-input card-input-small"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Особые инструкции */}
            <section className="checkout-section">
              <h2 className="section-title">Особые инструкции</h2>
              <textarea
                placeholder="Инструкции для доставщика..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="instructions-textarea"
              />
            </section>
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <h3 className="summary-title">Резюме заказа</h3>
              
              {Object.entries(itemsByRestaurant).map(([restaurantName, items]) => (
                <div key={restaurantName} className="restaurant-summary">
                  <h4 className="restaurant-name">{restaurantName}</h4>
                  {items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.total.toFixed(2)}€</span>
                    </div>
                  ))}
                  <div className="subtotal">
                    <span>Доставка</span>
                    <span>{(items.reduce((sum, item) => sum + item.total, 0) * 0.1).toFixed(2)}€</span>
                  </div>
                  <div className="restaurant-subtotal">
                    <span>Промежуточный итог {restaurantName}</span>
                    <span>{(items.reduce((sum, item) => sum + item.total, 0) + items.reduce((sum, item) => sum + item.total, 0) * 0.1).toFixed(2)}€</span>
                  </div>
                </div>
              ))}

              <div className="total-section">
                <div className="total">
                  <span className="total-label">Итого</span>
                  <span className="total-price">{(totalPrice * 1.1).toFixed(2)}€</span>
                </div>
              </div>

              <button 
                className="place-order-btn"
                onClick={handleSubmitOrder}
              >
                Оформить заказ
              </button>

              <div className="terms-text">
                <i>Соглашения об оказании услуг.</i> Нажимая кнопку «Оформить заказ», вы соглашаетесь с условиями оказания услуг доставки.
                        Обратите внимание: оформляя заказ, вы отказываетесь от права на отмену доставки после подтверждения, так как исполнение начинается немедленно.
                        В случае вашего отсутствия по адресу доставки, курьер оставит заказ у двери. Вы соглашаетесь, что после доставки ответственность за заказ полностью переходит к вам.
                        Заказы, содержащие алкоголь или иные товары с ограничениями по возрасту или закону, не будут оставлены без подтверждения личности и будут возвращены в заведение, если вы отсутствуете.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;