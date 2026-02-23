import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Spinner from "./components/Spinner";

// placeholders
const Dashboard = () => <div>Main dashboard TODO</div>
const Contact = () => <div>Contact form TODO</div>
const AdminPanel = () => <div>Admin Panel TODO</div>
const Login = () => <div>Login TODO</div>
const SessionPage = () => <div>Session page TODO</div>

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/session/:id" element={<SessionPage/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/login" element={<Login/>} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);