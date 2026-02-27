import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";

import AuthProvider from "./components/routing/Authprovider";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import "./index.css";
import { store } from "./store/store";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SessionPage = lazy(() => import("./pages/SessionPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));


const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/session/:id" element={<SessionPage/>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);