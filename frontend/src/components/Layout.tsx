import { Header } from "./Header"
import { Toaster } from "./ui/sonner"


interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="w-full">{children}</main>
            <Toaster />
        </div>
    )
}