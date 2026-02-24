import MainHeader from "../components/MainHeader"
import Footer from "../components/Footer"
import { Outlet, useLocation } from "react-router-dom"

export default function MainLayout() {
    const isHome = useLocation().pathname=== "/"

    return(
        <div className="min-h-screen flex flex-col bg-black text-white font-rubik">
            <MainHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}