'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { login } from './actions'

export default function LoginPage({ searchParams }: { searchParams: { error: string } }) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-zinc-100">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 border-b border-zinc-200 pb-4 mb-4">
                        Escuela primaria n 39<br />Ignacio Fermín Rodríguez
                    </h1>
                    <h2 className="text-xl font-semibold tracking-tight text-zinc-800">Iniciar Sesión</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                        Acceso exclusivo para administradores
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={login}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium leading-none text-zinc-700" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-2 flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium leading-none text-zinc-700" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="flex h-10 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {searchParams?.error && (
                        <p className="text-sm font-medium text-red-500 text-center">
                            Credenciales inválidas. Inténtalo de nuevo.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Entrar al sistema
                    </button>
                </form>
            </div>
        </div>
    )
}
