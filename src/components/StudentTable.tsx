'use client'

import { deleteAlumno, type Alumno } from '@/app/actions/alumnos'
import { Edit2, Trash2 } from 'lucide-react'

export function StudentTable({
    alumnos,
    onEdit
}: {
    alumnos: Alumno[]
    onEdit: (alumno: Alumno) => void
}) {

    async function handleDelete(id: string) {
        if (confirm('¿Estás seguro de que deseas eliminar a este alumno?')) {
            await deleteAlumno(id)
        }
    }

    if (alumnos.length === 0) {
        return (
            <div className="text-center p-8 bg-white rounded-2xl border border-zinc-200">
                <p className="text-zinc-500">No hay alumnos registrados.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 text-zinc-600 font-medium border-b border-zinc-200">
                        <tr>
                            <th className="px-6 py-4">Nombre Completo</th>
                            <th className="px-6 py-4">DNI</th>
                            <th className="px-6 py-4">Año Ingreso</th>
                            <th className="px-6 py-4">Año Egreso</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-zinc-800">
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium">{alumno.nombre_completo}</td>
                                <td className="px-6 py-4">{alumno.dni}</td>
                                <td className="px-6 py-4">{alumno.anio_ingreso}</td>
                                <td className="px-6 py-4">{alumno.anio_egreso}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(alumno)}
                                            className="p-2 text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200 rounded-md hover:bg-zinc-100 transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(alumno.id)}
                                            className="p-2 text-red-500 hover:text-red-700 bg-white border border-red-100 rounded-md hover:bg-red-50 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
