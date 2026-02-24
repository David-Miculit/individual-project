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


// placeholders
const Contact = () => <div>Contact form TODO</div>
const AdminPanel = () => <div>Admin Panel TODO</div>
const SessionPage = () => <div>Session page TODO</div>

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/session/:id" element={<SessionPage/>} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);