import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./store/store";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Spinner from "./components/Spinner";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import SessionPage from "./pages/SessionPage"
import NotFoundPage from "./pages/NotFoundPage";


// placeholders
const AdminPanel = () => <div>Admin Panel TODO</div>

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/session/:id" element={<SessionPage/>} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);