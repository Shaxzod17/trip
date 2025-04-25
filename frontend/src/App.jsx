import './App.css'
import { useEffect, useState, useRef } from 'react';
import 'primeicons/primeicons.css';
import TourImg from "./assets/image.jpg"
import TourLogo from "./assets/tourLogo.png"

function App() {
    const [navScrolled, setNavScrolled] = useState(false);
    const landingRef = useRef(null);
    const timelineEvents = [
        { year: "2022", description: "Лучшая турфирма года", side: "left" },
        { year: "2023", description: "Лидер в организации путешествий", side: "right" },
        { year: "2024", description: "Лидер UZfranchise", side: "left" },
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

    return (
        <div className="wrapper">
            <div className="landing" ref={landingRef}>
                <header className={`nav ${navScrolled ? 'scrolled' : 'default'}`}>
                    <div className="logo">EXP.WORLD</div>
                    <nav>
                        <ul>
                            <li>Горящие туры</li>
                            <li>Оплата</li>
                            <li>О нас</li>
                            <li>Услуги</li>
                            <li>Направления</li>
                            <li>Учебный центр</li>
                            <li>Контакты</li>
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



            <div className="tours">
                <h2 className="tours-title">Горящие туры</h2>
                <div className="blue-line"></div>
                <p className="tours-subtitle">Специальные предложения по лучшим ценам</p>

                <div className="tour-cards">
                    {[
                        {
                            country: "BAA",
                            price: 344,
                            image: TourImg
                        },
                        {
                            country: "NYACHANG",
                            price: 390,
                            image: TourImg
                        },
                        {
                            country: "Qatar",
                            price: 353,
                            image: TourImg
                        },
                        {
                            country: "Uzbekistan",
                            price: 199,
                            image: TourImg
                        },
                        {
                            country: "Spain",
                            price: 699,
                            image: TourImg
                        },
                        {
                            country: "Italy",
                            price: 559,
                            image: TourImg
                        }
                    ].map((tour, index) => (
                        <div key={index} className="tour-card">
                            <div className="tour-image-wrapper">
                                <img src={tour.image} alt={tour.country} className="tour-image" />
                                <div className="hot-badge">HOT</div>
                            </div>
                            <div className="tour-info">
                                <p>Страна: {tour.country}</p>
                                <p>Отель: 3 <i className="pi pi-star-fill" style={{ textAlign: 'center', fontSize:"14px" }}></i></p>
                                <p>Длительность: 8 дней</p>
                                <p>Питание: Nonushta</p>
                                <h3>{tour.price} $</h3>
                                <div className="tour-buttons">
                                    <button className="primary"><i className="pi pi-pencil" style={{ textAlign: 'center' }}></i> Оставить заявку</button>
                                    <button className="secondary"><i className="pi pi-phone" style={{ textAlign: 'center' }}></i> Позвонить</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="aboutUs">
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


        </div>
    );
}

export default App;
