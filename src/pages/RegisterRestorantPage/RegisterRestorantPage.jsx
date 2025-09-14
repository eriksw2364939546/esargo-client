"use client"

import { useState } from "react";
import "./RegisterRestorantPage.scss"
import { Check } from "lucide-react";

const RegisterRestorantPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        floor: '',
        storeName: '',
        brandName: '',
        businessType: '',
        whatsappConsent: false
    });

    const [showBusinessTypes, setShowBusinessTypes] = useState(false);

    const businessTypes = [
        'Еда',
        'Алкоголь', 
        'Косметика',
        'Цветы',
        'Домашние Животные'
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBusinessTypeSelect = (type) => {
        setFormData(prev => ({
            ...prev,
            businessType: type
        }));
        setShowBusinessTypes(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return(
        <main className="register-restorant__page">
            <div className="container">
                <div className="register-content">
                    <div className="register-left">
                        <div className="register-hero">
                            <h1 className="register-title">
                                Будущее вашего<br /> роста 
                                 начинается здесь
                            </h1>
                            <p className="register-subtitle">
                                ESARGO — это больше, чем платформа. Это путь к новым клиентам,
                                 умным решениям и устойчивому доходу.
                                  Присоединяйтесь к сообществу лидеров.
                            </p>
                        </div>
                    </div>

                    <div className="register-right">
                        <div className="register-form-container">
                            <div className="form-header">
                                <h2>Начать</h2>
                                <p className="form-login-link">
                                    У вас уже есть аккаунт? <a href="/login">Войти</a>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="register-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Имя</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Фамилия</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Электронная почта</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Номер мобильного телефона</label>
                                    <div className="phone-input">
                                        <select className="country-code">
                                            <option value="FR">FR</option>
                                        </select>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="+33"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Адрес магазина</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Начните вводить текст..."
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Этаж/люкс (по желанию)</label>
                                    <input
                                        type="text"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Название магазина</label>
                                    <input
                                        type="text"
                                        name="storeName"
                                        placeholder="Sam's Pizza (123 Main Street)"
                                        value={formData.storeName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Название бренда</label>
                                    <input
                                        type="text"
                                        name="brandName"
                                        placeholder="Пример: Sam's Pizza"
                                        value={formData.brandName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <small className="form-help-text">
                                        Мы будем использовать это для организации информации, которой обмениваются
                                        магазины, например, меню.
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label>Тип бизнеса</label>
                                    <div className="business-type-dropdown">
                                        <button
                                            type="button"
                                            className="dropdown-button"
                                            onClick={() => setShowBusinessTypes(!showBusinessTypes)}
                                        >
                                            {formData.businessType || 'Выбрать...'}
                                            <span className="dropdown-arrow">▼</span>
                                        </button>
                                        {showBusinessTypes && (
                                            <div className="dropdown-menu">
                                                {businessTypes.map((type, index) => (
                                                    <div
                                                        key={index}
                                                        className="dropdown-item"
                                                        onClick={() => handleBusinessTypeSelect(type)}
                                                    >
                                                        {type}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="whatsappConsent"
                                            checked={formData.whatsappConsent}
                                            onChange={handleInputChange}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="checkbox-text">
                                            Я согласен на обмен сообщениями WhatsApp
                                        </span>
                                    </label>
                                    <p className="consent-text">
                                        Выбирая «Я согласен» выше, я подтверждаю, что являюсь уполномоченным
                                        представителем ресторана/магазина, могу получать SMS-сообщения или
                                        телефонные звонки от ESARGO, а также даю согласие на то, чтобы со мной
                                        связались через WhatsApp по вопросам учетной записи продавца ESARGO
                                        Eats и обновлений для регистрации, в том числе с помощью автоматического
                                        дозвона, от ESARGO и ее аффилированных лиц по предоставленному мной
                                        номер.
                                    </p>
                                    <p className="terms-text">
                                        Нажимая кнопку «Отправить», вы соглашаетесь с <a href="/terms">Условиями использования ESARGO
                                        Eats для продавцов</a> и подтверждаете, что ознакомились с <a href="/privacy">Уведомлением о
                                        конфиденциальности</a>
                                    </p>
                                </div>

                                <button type="submit" className="submit-button">
                                    Представить на рассмотрение
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RegisterRestorantPage