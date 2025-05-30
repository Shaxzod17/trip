import { useState, useEffect } from "react";
import "./AdminAddTour.css"

function AdminAddTour() {
    const [formData, setFormData] = useState({
        country: "",
        duration: "",
        hotel: "",
        meals: "",
        price: "",
        image: "",
        servises: "",
        hot: false
    });

    const [message, setMessage] = useState("");
    const [tours, setTours] = useState([]);

    const fetchTours = async () => {
        try {
            const response = await fetch("/api/v1/tours/list");
            const data = await response.json();
            setTours(data);
        } catch (error) {
            console.error("Ошибка при получении туров:", error);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        let newValue;

        if (type === "checkbox") {
            newValue = checked;
        } else if (type === "file") {
            newValue = files[0]; // Store the File object
        } else {
            newValue = value;
        }

        setFormData({ ...formData, [name]: newValue });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        formPayload.append("country", formData.country);
        formPayload.append("duration", parseInt(formData.duration)); // make sure it's an integer
        formPayload.append("hotel", formData.hotel);
        formPayload.append("meals", formData.meals);
        formPayload.append("price", parseFloat(formData.price)); // ensure it's float
        formPayload.append("servises", formData.servises);
        formPayload.append("hot", formData.hot ? "true" : "false"); // string boolean
        if (formData.image) {
            formPayload.append("image", formData.image);
        }

        try {
            const response = await fetch("/api/v1/tour_request/create", {
                method: "POST",
                body: formPayload
            });

            if (response.ok) {
                setMessage("✅ Тур успешно добавлен!");
                setFormData({
                    country: "",
                    duration: "",
                    hotel: "",
                    meals: "",
                    price: "",
                    image: "",
                    servises: "",
                    hot: false,
                });
                fetchTours();
            } else {
                const errorText = await response.text();
                setMessage(`❌ Ошибка: ${errorText || "Невозможно добавить тур"}`);
            }
        } catch (error) {
            setMessage(`❌ Сетевая ошибка: ${error.message}`);
        }
    };


    return (
        <div className="admin-add-tour">
            <h2>Добавить тур</h2>
            <form onSubmit={handleSubmit} className="add-tour-form">
                <input name="country" type="text" placeholder="Страна" value={formData.country} onChange={handleChange} required />
                <input name="duration" type="number" placeholder="Длительность (в днях)" value={formData.duration} onChange={handleChange} required />
                <input name="hotel" type="text" placeholder="Отель" value={formData.hotel} onChange={handleChange} required />
                <input name="meals" type="text" placeholder="Питание" value={formData.meals} onChange={handleChange} required />
                <input name="price" type="number" placeholder="Цена" value={formData.price} onChange={handleChange} required />
                <input name="image" type="file" onChange={handleChange} />
                <textarea name="servises" placeholder="Сервисы" value={formData.servises} onChange={handleChange}></textarea>
                <label>
                    <input type="checkbox" name="hot" checked={formData.hot} onChange={handleChange} />
                    Горящий тур?
                </label>
                <button type="submit" className="submit-btn">Добавить</button>
            </form>
            {message && <p className="message">{message}</p>}

            <h3 style={{ marginTop: "40px" }}>Список туров</h3>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "10px" }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Страна</th>
                    <th>Длительность</th>
                    <th>Отель</th>
                    <th>Питание</th>
                    <th>Цена</th>
                    <th>Сервисы</th>
                    <th>Горящий?</th>
                </tr>
                </thead>
                <tbody>
                {tours.map((tour) => (
                    <tr key={tour.id}>
                        <td>{tour.id}</td>
                        <td>{tour.country}</td>
                        <td>{tour.duration}</td>
                        <td>{tour.hotel}</td>
                        <td>{tour.meals}</td>
                        <td>{tour.price}$</td>
                        <td>{tour.servises}</td>
                        <td>{tour.hot ? "Да" : "Нет"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAddTour;
