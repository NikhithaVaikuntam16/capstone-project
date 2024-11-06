import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;