import { getAlumnos } from '@/app/actions/alumnos'
import { SearchInput } from '@/components/SearchInput'
import { DashboardClient } from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
    searchParams,
}: {
    searchParams?: {
        q?: string
    }
}) {
    const query = searchParams?.q || ''

    // Fetch from Supabase
    const alumnos = await getAlumnos(query)

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Alumnos</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        Administra los alumnos registrados en el sistema. Total: <span className="font-semibold text-zinc-900">{alumnos.length}</span>
                    </p>
                </div>
                <div className="w-full sm:w-auto sm:max-w-xs flex-1 border-b">
                    <SearchInput />
                </div>
            </div>

            <DashboardClient initialAlumnos={alumnos} />
        </div>
    )
}
