import { LogOut, Users } from 'lucide-react'
import { logout } from '@/app/login/actions'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-10 w-full bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-zinc-900 rounded-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg tracking-tight text-zinc-900 line-clamp-1">
                                Escuela primaria n 39 Ignacio Fermín Rodríguez
                            </span>
                        </div>

                        <form action={logout}>
                            <button
                                type="submit"
                                className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors py-2 px-3 rounded-md hover:bg-zinc-100"
                            >
                                <LogOut className="w-4 h-4" />
                                Cerrar Sesión
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Main Content Container */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}
