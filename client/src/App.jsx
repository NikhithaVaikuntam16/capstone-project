import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./components/CartContext";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ShoppingCartPage from "./components/ShoppingCartPage";

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
        <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/category/:id" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
        </Routes>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
