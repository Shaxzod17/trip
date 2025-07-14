import './App.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import TourImg from "./assets/image.jpg";
import TourLogo from "./assets/tourLogo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LandingPage() {
    const [navScrolled, setNavScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const landingRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/tour/get")
            .then((res) => res.json())
            .then((data) => setTours(data))
            .catch((err) => console.error("Ошибка при загрузке туров:", err));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const landingBottom = landingRef.current?.getBoundingClientRect().bottom;
            setNavScrolled(landingBottom <= 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        navigate(`#${id}`);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    };

    const handleTourRequestSubmit = () => {
        if (!selectedTour) return;

        const payload = {
            tour: selectedTour.id,
            full_name: fullName,
            phone_number: phoneNumber,
            message: message,
        };

        fetch("http://localhost:8080/api/tour/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при отправке запроса");
                return res.json();
            })
            .then((data) => {
                toast.success("Заявка успешно отправлена!");
                setSelectedTour(null);
                setFullName('');
                setPhoneNumber('');
                setMessage('');
            })
            .catch((err) => {
                console.error(err);
                toast.error("Ошибка при отправке. Попробуйте снова.");
            });
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

    const timelineEvents = [
        { year: "2022", description: "Лучшая турфирма года", side: "left" },
        { year: "2023", description: "Лидер в организации путешествий", side: "right" },
        { year: "2024", description: "Лидер UZfranchise", side: "left" },
    ];

    return (
        <div className="wrapper">
            <ToastContainer
            autoClose={1500}
            />
            <div className="landing" ref={landingRef}>
                <header className={`nav ${navScrolled ? 'scrolled' : 'default'}`}>
                    <div className="logo">EXP.WORLD</div>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <i className="pi pi-times close-icon"></i>
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
                            <li onClick={() => scrollToSection('tours')}>Горящие туры</li>
                            <li onClick={() => scrollToSection('aboutUs')}>О нас</li>
                            <li onClick={() => scrollToSection('services')}>Услуги</li>
                            <li onClick={() => scrollToSection('footer')}>Контакты</li>
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

            {/* Tours */}
            <div className="tours" id="tours">
                <h2 className="tours-title">Горящие туры</h2>
                <div className="blue-line"></div>
                <p className="tours-subtitle">Специальные предложения по лучшим ценам</p>
                <div className="tour-cards">
                    {tours.map((tour, index) => (
                        <div key={index} className="tour-card">
                            <div className="tour-image-wrapper">
                                <img src={tour.image || TourImg} alt={tour.country} className="tour-image" />
                                <div className="hot-badge">HOT</div>
                            </div>
                            <div className="tour-info">
                                <p>Страна: {tour.country}</p>
                                <p>Отель: {tour.hotel} <i className="pi pi-star-fill" /></p>
                                <p>Длительность: {tour.duration}</p>
                                <p>Питание: {tour.meals}</p>
                                <h3>{tour.price} $</h3>
                                <div className="tour-buttons">
                                    <button className="primary" onClick={() => setSelectedTour(tour)}>
                                        <i className="pi pi-pencil" /> Оставить заявку
                                    </button>
                                    <button className="secondary">
                                        <i className="pi pi-phone" /> Позвонить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedTour && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <button className="modal-close" onClick={() => setSelectedTour(null)}>×</button>
                            <div className="modal-tour-info">
                                <p><i className="pi pi-map-marker"></i> Выбранный тур <strong>${selectedTour.price}</strong></p>
                                <h3>{selectedTour.country}</h3>
                            </div>
                            <div className="modal-form">
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Ваш номер телефона"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <textarea
                                    placeholder="Ваше сообщение"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <button className="submit-btn" onClick={handleTourRequestSubmit}>
                                    Отправить
                                </button>
                            </div>
                            <div className="modal-phone">
                                <p>Или позвоните нам</p>
                                <a href="tel:+99899999999">+99899999999</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* About Us */}
            <div className="aboutUs" id="aboutUs">
                <h2 className="about-title">О нас</h2>
                <div className="blue-line"></div>
                <div className="history-header">
                    <img src={TourLogo} alt="Tour Logo" className="history-logo" />
                    <p>EXP.WORLD работает с 2024 года и уже имеет 5+ филиалов. Основатели: Мирсалимова Азизахон и Сайдуллаева Малихахон.</p>
                </div>
                <div className="history-stats">
                    <div className="stat-card"><h3>5+</h3><p>Филиалы</p></div>
                    <div className="stat-card"><h3>3000+</h3><p>Самолетов</p></div>
                    <div className="stat-card"><h3>60000+</h3><p>Клиенты</p></div>
                </div>
                <div className="timeline">
                    {timelineEvents.map((event, i) => (
                        <div className={`timeline-item ${event.side}`} key={i}>
                            <div className="content"><h4>{event.year}</h4><p>{event.description}</p></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Services */}
            <div className="services" id="services">
                <h2 className="service-title">Наши услуги</h2>
                <div className="blue-line"></div>
                <p className="service-subtitle">Организация путешествий, туры и транспорт</p>
                <div className="service-cards">
                    {services.map((s, i) => (
                        <div key={i} className="service-card">
                            <i className={s.icon}></i>
                            <h3>{s.title}</h3>
                            <p>{s.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="footer" id="footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <img src={TourLogo} alt="Logo" className="footer-logo" />
                        <p>р. Узбекистан, г. Не знаю, 0</p>
                    </div>
                    <div className="footer-section">
                        <h4>Компания</h4>
                        <ul>
                            <li>Оплата</li><li>О нас</li><li>Филиалы</li><li>Политика конфиденциальности</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Контакты</h4>
                        <ul>
                            <li><i className="pi pi-phone" /> +998999999999</li>
                            <li><i className="pi pi-envelope" /> companyname.uz@gmail.com</li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Социальные сети</h4>
                        <div className="social-icons">
                            <i className="pi pi-facebook" />
                            <i className="pi pi-instagram" />
                            <i className="pi pi-telegram" />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">© 2025 EXP.WORLD. Все права защищены</div>
            </footer>
        </div>
    );
}

export default LandingPage;
