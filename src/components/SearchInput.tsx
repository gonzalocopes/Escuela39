'use client'

import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition, useState } from 'react'

export function SearchInput() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [isPending, startTransition] = useTransition()

    const [term, setTerm] = useState(searchParams.get('q')?.toString() || '')

    function handleSearch(term: string) {
        setTerm(term)
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            if (term) {
                params.set('q', term)
            } else {
                params.delete('q')
            }
            replace(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Buscar
            </label>
            <input
                className="peer block w-full rounded-md border border-zinc-300 py-2.5 pl-10 text-sm outline-2 placeholder:text-zinc-500 focus:border-zinc-900 focus:outline-none focus:ring-zinc-900"
                placeholder="Buscar por DNI..."
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                value={term}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 peer-focus:text-zinc-900" />
            {isPending && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">cargando...</div>}
        </div>
    )
}
