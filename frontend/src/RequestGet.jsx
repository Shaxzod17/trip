import { useEffect, useState} from 'react';
import "./RequestGet.css"

function RequestGet() {
    const [request, setRequest] = useState([]);

    const fetchRequest = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/request");
            const data = await response.json();
            setRequest(data);
        } catch (error) {
            console.error("Ошибка при получении туров:", error);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    return (
        <div>
            <h3 className="tour-text">Список туров</h3>
            <table className="beautiful-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Телефон номер</th>
                    <th>Сообщение</th>
                    <th>Выбранный тур</th>
                </tr>
                </thead>
                <tbody>
                {request.map((r) => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.fullName}</td>
                        <td>{r.phoneNumber}</td>
                        <td>{r.message}</td>
                        <td>{r.tour?.country || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RequestGet;