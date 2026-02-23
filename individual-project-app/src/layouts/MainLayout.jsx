import MainHeader from "../components/MainHeader"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
    return(
        <div className="min-h-screen flex flex-col bg-zinc-950 text-white font-rubik">
            <MainHeader />
            <main className="flex-1 container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
        
    )
}