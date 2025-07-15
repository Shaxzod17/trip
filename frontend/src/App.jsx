import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage.jsx';
import AdminAddTour from './AdminAddTour.jsx';
import RequestGet from "./RequestGet.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin" element={<AdminAddTour />} />
                <Route path="/request" element={<RequestGet />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
