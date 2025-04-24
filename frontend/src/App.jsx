import './App.css'
import { useEffect, useState, useRef } from 'react';

function App() {
    const [navScrolled, setNavScrolled] = useState(false);
    const landingRef = useRef(null);

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
                    <div className="logo">TripTour</div>
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
                    <p>Откройте мир с ********</p>
                    <p className="p-text">Качественные и надежные туристические услуги с 2021 года</p>
                    <h2>+998 99 999 99 99 </h2>
                    <div className="buttons">
                        <button className="primary">Планировать путешествие</button>
                        <button className="secondary">Контакты</button>
                    </div>
                </div>
            </div>


            
            <div>

            </div>
        </div>
    );
}

export default App;
