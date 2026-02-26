import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Suspense } from "react";

export default function MainLayout() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-saira">
      <MainHeader />
      <main className="flex-1">
        <Suspense fallback={<Spinner />} key={location.key}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
