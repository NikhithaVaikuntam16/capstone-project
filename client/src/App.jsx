import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import ProductListPage from "./components/ProductListPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category/:id" element={<ProductListPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
