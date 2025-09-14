"use client";

import "./OneStorePage.scss";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getRestaurantById } from "@/services/serviceRestorant";
import { getMenuByRestaurantId } from "@/services/serviceMenuRestorant"; 
import Loader from "@/components/Loader/Loader";
import { Star, Clock4, Truck, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductModal from "@/components/ProductModal/ProductModal";

const OneStorePage = () => {
  const { storeId } = useParams();
  const router = useRouter();

  const [shop, setShop] = useState(null);
  const [menuItems, setMenuItems] = useState([]); // Состояние для продуктов
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(false); // Загрузка меню
  const [error, setError] = useState("");

  // Состояния для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const menuRef = useRef(null);

  const scrollMenu = (direction) => {
    if (!menuRef.current) return;
    const scrollAmount = 200;
    menuRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Функция для открытия модального окна
  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      try {
        const res = await getRestaurantById(storeId);
        if (res.success && res.data?.restaurant) {
          setShop(res.data.restaurant);
        } else {
          setError("Магазин не найден");
        }
      } catch (e) {
        setError(e.message || "Ошибка при получении данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  // Получение меню после загрузки данных ресторана
  useEffect(() => {
    if (!storeId || !shop) return;

    const fetchMenu = async () => {
      setMenuLoading(true);
      try {
        const items = await getMenuByRestaurantId(storeId, {
          include_unavailable: true
        });
        // Извлекаем только нужные поля
        const filteredItems = items.map(item => ({
          _id: item._id,
          price: item.price,
          images: item.images,
          name: item.name,
          description: item.description,
          category: item.category
        }));
        setMenuItems(filteredItems || []);
      } catch (e) {
        console.error("Ошибка при получении меню:", e.message);
        // Не устанавливаем ошибку, чтобы не блокировать отображение страницы
      } finally {
        setMenuLoading(false);
      }
    };

    fetchMenu();
  }, [storeId, shop]);

  const getWorkingHoursDisplay = (workingHours) => {
    if (!workingHours) return { workingDays: [], closedDays: [] };

    const days = {
      monday: "Пн",
      tuesday: "Вт",
      wednesday: "Ср",
      thursday: "Чт",
      friday: "Пт",
      saturday: "Сб",
      sunday: "Вс",
    };

    const dayOrder = Object.keys(days);
    const workingGroups = {};
    const closedDays = [];

    dayOrder.forEach((day) => {
      const hours = workingHours[day];
      if (hours?.is_closed) {
        closedDays.push(days[day]);
      } else if (hours) {
        const timeSlot = `${hours.open} - ${hours.close}`;
        if (!workingGroups[timeSlot]) workingGroups[timeSlot] = [];
        workingGroups[timeSlot].push(day);
      }
    });

    const workingDays = [];

    Object.entries(workingGroups).forEach(([timeSlot, daysArray]) => {
      const dayRanges = [];
      let start = 0;

      while (start < daysArray.length) {
        let end = start;
        while (
          end + 1 < daysArray.length &&
          dayOrder.indexOf(daysArray[end + 1]) ===
            dayOrder.indexOf(daysArray[end]) + 1
        ) {
          end++;
        }

        if (start === end) {
          dayRanges.push(days[daysArray[start]]);
        } else {
          dayRanges.push(
            `${days[daysArray[start]]}-${days[daysArray[end]]}`
          );
        }

        start = end + 1;
      }

      workingDays.push(`${dayRanges.join(", ")}: ${timeSlot}`);
    });

    return { workingDays, closedDays };
  };

  const getRestaurantImage = () => {
    return shop?.image || shop?.logo || "/assets/img/company-image.png";
  };

  // Группировка продуктов по категориям
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || "Без категории";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="error-wrapper">
        <p style={{ color: "red" }}>{error || "Магазин не найден"}</p>
        <button onClick={() => router.back()} className="btn">
          Назад
        </button>
      </div>
    );
  }

  const { workingDays, closedDays } = getWorkingHoursDisplay(
    shop.working_hours
  );

  return (
    <main className="one-store">
      <div className="container">
        <div className="one-store__wrapper">
          <div className="store-head">
            <div className="store-head__img">
              <Link href="/stores" className="store-back__btn">
                <ArrowLeft size={15} /> Назад
              </Link>
              <div className="head-img__wrapper">
                <Image
                  src="/assets/img/store-img.jpg"
                  alt="Business image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="store-head__info row">
              <div className="head-info__element">
                <h1>{shop.name}</h1>
                <p className="store-descr" title={shop.longDescription}>
                  {shop.longDescription}
                </p>
                <div className="head-info__details">
                  <div className="info-details__item">
                    <Star size={16} />
                    <p>{shop.rating}</p>
                  </div>
                  <div className="info-details__item">
                    <Clock4 size={16} />
                    <p>20 мин.</p>
                  </div>
                  <div className="info-details__item">
                    <Truck size={16} />
                    <p>{shop.delivery_fee}€</p>
                  </div>
                </div>
                <p className="store-descr__min-order">
                  Минимальный заказ: {shop.min_order_amount}€
                </p>

                <div className="store-working__time info">
                  <div className="store-working__time-el">
                    <h3>Контакты</h3>
                    <p>
                      <b>Адрес:</b> - {shop.address}
                    </p>
                    <p>
                      <b>Телефон:</b> - {shop.phone}
                    </p>
                    <p>
                      <b>Эл-адрес:</b> - {shop.email}
                    </p>
                    <p>
                      <b>Информация:</b> - Этот продавец подтверждает, что его
                      продукция соответствует действующему законодательству.
                    </p>
                  </div>

                  <div className="store-working__time-el">
                    <h2>Время работы</h2>
                    <div className="working-hours">
                      {workingDays.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                      {closedDays.length > 0 && (
                        <p>Выходные: {closedDays.join(", ")}</p>
                      )}
                    </div>
                  </div>
                </div>

                <button className="head-store__favorites-btn">
                  <Heart size={20} />
                  <p>Добавить в избранные </p>
                </button>
              </div>

              <div className="head-info__element">
                <div className="one-stor__location">
                  {shop.location?.iframe ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: shop.location.iframe }}
                    />
                  ) : (
                    <div className="location-placeholder">
                      <p>Карта недоступна</p>
                      <p>{shop.address}</p>
                      {shop.location?.coordinates && (
                        <a
                          href={`https://maps.google.com/?q=${shop.location.coordinates[1]},${shop.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Открыть в Google Maps
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="store-menu__scroll-wrapper">
            <button
              className="scroll-btn left"
              onClick={() => scrollMenu("left")}
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="store-menu__section-btns" ref={menuRef}>
              {Object.keys(groupedMenuItems).map((category, i) => (
                <Link className="menu__section-btn" href={`#${category}`} key={i}>
                  {category}
                </Link>
              ))}
            </div>

            <button
              className="scroll-btn right"
              onClick={() => scrollMenu("right")}
              aria-label="Scroll right"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="store-products">
            {menuLoading ? (
              <div className="loader-wrapper">
                <Loader />
                <p>Загрузка меню...</p>
              </div>
            ) : Object.keys(groupedMenuItems).length > 0 ? (
              Object.entries(groupedMenuItems).map(([category, items]) => (
                <div key={category} id={category} className="category-section">
                  <h2 className="category-title">{category}</h2>
                  <div className="products-grid">
                    {items.map((item) => (
                      <ProductCard
                        key={item._id}
                        price={item.price}
                        images="/assets/img/product-image2.webp"
                        name={item.name}
                        description={item.description}
                        category={item.category}
                        onAddClick={() => handleProductClick(item._id)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>В данном ресторане пока нет доступных блюд</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productId={selectedProductId}
        restaurantName={shop?.name}
      />
    </main>
  );
};

export default OneStorePage;