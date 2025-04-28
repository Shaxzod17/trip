import './App.css'
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'primeicons/primeicons.css';
import TourImg from "./assets/image.jpg"
import TourLogo from "./assets/tourLogo.png"

function App() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const landingRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTour, setSelectedTour] = useState(null);

    const timelineEvents = [
        { year: "2022", description: "Лучшая турфирма года", side: "left" },
        { year: "2023", description: "Лидер в организации путешествий", side: "right" },
        { year: "2024", description: "Лидер UZfranchise", side: "left" },
    ];

    const tours = [
        { country: "BAA", price: 344, image: TourImg },
        { country: "NYACHANG", price: 390, image: TourImg },
        { country: "Qatar", price: 353, image: TourImg },
        { country: "Uzbekistan", price: 199, image: TourImg },
        { country: "Spain", price: 699, image: TourImg },
        { country: "Italy", price: 559, image: TourImg }
    ];

    const openModal = (tour) => {
        setSelectedTour(tour);
    };

    const closeModal = () => {
        setSelectedTour(null);
    };

    const services = [
        {
            icon: "pi pi-check-square",
            title: "Виды путешествий",
            description: "Быстро и легко организуемые путешествия в любую точку мира",
        },
        {
            icon: "pi pi-check-square",
            title: "Транспортные услуги",
            description: "Авиабилеты, групповые поездки на автобусах и микроавтобусах",
        },
        {
            icon: "pi pi-check-square",
            title: "Проживание",
            description: "Бронирование отелей, курортов и гостевых домов",
        },
        {
            icon: "pi pi-check-square",
            title: "Визы и документы",
            description: "Подготовка необходимых документов для международных путешествий",
        },
        {
            icon: "pi pi-check-square",
            title: "Страхование путешествий",
            description: "Страховые услуги для обеспечения безопасности во время путешествия",
        },
    ];



    useEffect(() => {
        const handleScroll = () => {
            const landingBottom = landingRef.current?.getBoundingClientRect().bottom;

            if (landingBottom <= 0) {
                setNavScrolled(true);
            } else {
                setNavScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        navigate(`#${id}`);
        setTimeout(() => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
    };


    return (
        <div className="wrapper">
            <div className="landing" ref={landingRef}>
                <header className={`nav ${navScrolled ? 'scrolled' : 'default'}`}>
                    <div className="logo">EXP.WORLD</div>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <span className="close-icon"><i className="pi pi-times" style={{ textAlign: 'center' }}></i></span>
                        ) : (
                            <>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </>
                        )}
                    </div>
                    <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        <ul>
                            <li onClick={() => { scrollToSection('tours'); setMenuOpen(false); }}>Горящие туры</li>
                            <li onClick={() => { scrollToSection('aboutUs'); setMenuOpen(false); }}>О нас</li>
                            <li onClick={() => { scrollToSection('services'); setMenuOpen(false); }}>Услуги</li>
                            <li onClick={() => { scrollToSection('footer'); setMenuOpen(false); }}>Контакты</li>
                        </ul>
                    </nav>

                    <div className="lang-switch">
                        <span>UZ</span>
                        <span className="active">RU</span>
                        <span>EN</span>
                    </div>
                </header>

                <div className="hero">
                    <h1>Путешествия по всему миру</h1>
                    <p>Откройте мир с EXP.WORLD</p>
                    <p className="p-text">Качественные и надежные туристические услуги с 2024 года</p>
                    <h2>+998 99 999 99 99 </h2>
                    <div className="buttons">
                        <button className="primary">Планировать путешествие</button>
                        <button className="secondary">Контакты</button>
                    </div>
                </div>
            </div>



            <div className="tours" id="tours">
                <h2 className="tours-title">Горящие туры</h2>
                <div className="blue-line"></div>
                <p className="tours-subtitle">Специальные предложения по лучшим ценам</p>

                <div className="tour-cards">
                    {tours.map((tour, index) => (
                        <div key={index} className="tour-card">
                            <div className="tour-image-wrapper">
                                <img src={tour.image} alt={tour.country} className="tour-image" />
                                <div className="hot-badge">HOT</div>
                            </div>
                            <div className="tour-info">
                                <p>Страна: {tour.country}</p>
                                <p>Отель: 3 <i className="pi pi-star-fill" style={{ fontSize: "14px" }}></i></p>
                                <p>Длительность: 8 дней</p>
                                <p>Питание: Nonushta</p>
                                <h3>{tour.price} $</h3>
                                <div className="tour-buttons">
                                    <button className="primary" onClick={() => openModal(tour)}>
                                        <i className="pi pi-pencil" style={{ textAlign: 'center' }}></i> Оставить заявку
                                    </button>
                                    <button className="secondary">
                                        <i className="pi pi-phone" style={{ textAlign: 'center' }}></i> Позвонить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTour && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <button className="modal-close" onClick={closeModal}>×</button>
                            <div className="modal-tour-info">
                                <p><i className="pi pi-map-marker"></i> Выбранный тур <strong>${selectedTour.price}</strong></p>
                                <h3>{selectedTour.country}</h3>
                            </div>
                            <div className="modal-form">
                                <input type="text" placeholder="Ваше имя"/>
                                <input type="tel" placeholder="Ваш номер телефона" />
                                <textarea placeholder="Ваше сообщение"></textarea>
                                <button className="submit-btn">Отправить</button>
                            </div>
                            <div className="modal-phone">
                                <p>Или позвоните нам</p>
                                <a href="tel:+998785557788">+99899999999</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="aboutUs" id="aboutUs">
                <h2 className="about-title">О нас</h2>
                <div className="blue-line"></div>
                <div className="history-header">
                    <img src={TourLogo} alt="Trip Tour Logo" className="history-logo" />
                    <p>
                        Туристическое агентство EXP.WORLD начало свою деятельность в 2024 году и на сегодняшний день имеет более 5 филиалов. Наши основатели - Мирсалимова Азизахон и Сайдуллаева Малихахон. Под руководством директоров EXP.WORLD предоставляет множество возможностей для путешествий.
                    </p>
                </div>

                <div className="history-stats">
                    <div className="stat-card">
                        <h3>5+</h3>
                        <p>Филиалы</p>
                    </div>
                    <div className="stat-card">
                        <h3>3000+</h3>
                        <p>Самолетов</p>
                    </div>
                    <div className="stat-card">
                        <h3>60000+</h3>
                        <p>Клиенты</p>
                    </div>
                </div>

                <div className="timeline">
                    {timelineEvents.map((event, index) => (
                        <div className={`timeline-item ${event.side}`} key={index}>
                            <div className="content">
                                <h4>{event.year}</h4>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="services" id="services">
                <h2 className="service-title">Наши услуги</h2>
                <div className="blue-line"></div>
                <p className="service-subtitle">
                    Организация путешествий, планирование туристических туров и транспортные услуги
                </p>

                <div className="service-cards">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <i className={service.icon}></i>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer" id="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <img src={TourLogo} alt="TripTour Logo" className="footer-logo" />
                        <p>р. Узбекистан, г. Не знаю, 0</p>
                    </div>

                    <div className="footer-section">
                        <h4>Компания</h4>
                        <ul>
                            <li>Оплата</li>
                            <li>О нас</li>
                            <li>Филиалы</li>
                            <li>Политика конфиденциальности</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Контакты</h4>
                        <ul>
                            <li><i className="pi pi-phone" style={{ textAlign: 'center', marginRight:"10px" }}></i> +998999999999</li>
                            <li><i className="pi pi-envelope" style={{ textAlign: 'center', marginRight:"10px" }}></i> companyname.uz@gmail.com</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Социальные сети</h4>
                        <div className="social-icons">
                            <i className="pi pi-facebook" style={{ textAlign: 'center' }}></i>
                            <i className="pi pi-instagram" style={{ textAlign: 'center' }}></i>
                            <i className="pi pi-telegram" style={{ textAlign: 'center' }}></i>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2025 EXP.WORLD. Все права защищены
                </div>
            </footer>

        </div>
    );
}

export default App;
