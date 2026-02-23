import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import "./index.css";
import HomePage from "./pages/HomePage";
import Spinner from "./components/Spinner";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);