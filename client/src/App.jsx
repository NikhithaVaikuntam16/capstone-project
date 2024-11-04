import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<RegistrationForm />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;