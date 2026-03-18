'use client'

import { useState } from 'react'
import { createAlumno, updateAlumno, Alumno } from '@/app/actions/alumnos'

export function StudentForm({
    alumnoEdit,
    onClearEdit,
}: {
    alumnoEdit?: Alumno | null
    onClearEdit: () => void
}) {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const formData = new FormData(e.currentTarget)

        let result
        if (alumnoEdit) {
            result = await updateAlumno(alumnoEdit.id, formData)
        } else {
            result = await createAlumno(formData)
        }

        setLoading(false)

        if (result.success) {
            setSuccess(alumnoEdit ? 'Alumno actualizado exitosamente' : 'Alumno guardado exitosamente')
            if (!alumnoEdit) {
                // Form is naturally reset by not continuing to edit, 
                // but we force a physical form reset
                ; (e.target as HTMLFormElement).reset()
            } else {
                onClearEdit()
            }
        } else {
            setError(result.error || 'Ocurrió un error al guardar el alumno')
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 mb-8">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">
                {alumnoEdit ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 items-end">
                <div>
                    <label htmlFor="nombre_completo" className="block text-sm font-medium text-zinc-700">Nombre Completo</label>
                    <input
                        type="text"
                        name="nombre_completo"
                        id="nombre_completo"
                        defaultValue={alumnoEdit?.nombre_completo || ''}
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-zinc-900"
                    />
                </div>

                <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-zinc-700">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        id="dni"
                        defaultValue={alumnoEdit?.dni || ''}
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-zinc-900"
                    />
                </div>

                <div>
                    <label htmlFor="anio_ingreso" className="block text-sm font-medium text-zinc-700">Año Ingreso</label>
                    <input
                        type="number"
                        name="anio_ingreso"
                        id="anio_ingreso"
                        defaultValue={alumnoEdit?.anio_ingreso || new Date().getFullYear()}
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-zinc-900"
                    />
                </div>

                <div>
                    <label htmlFor="anio_egreso" className="block text-sm font-medium text-zinc-700">Año Egreso</label>
                    <input
                        type="number"
                        name="anio_egreso"
                        id="anio_egreso"
                        defaultValue={alumnoEdit?.anio_egreso || new Date().getFullYear() + 5}
                        required
                        className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-zinc-900"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Guardando...' : (alumnoEdit ? 'Actualizar' : 'Guardar Alumno')}
                    </button>

                    {alumnoEdit && (
                        <button
                            type="button"
                            onClick={onClearEdit}
                            className="flex-1 bg-zinc-100 text-zinc-700 border border-zinc-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">
                    {error.includes('duplicate key value') ? 'El DNI ingresado ya existe en la base de datos.' : error}
                </div>
            )}

            {success && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm border border-green-100">
                    {success}
                </div>
            )}
        </div>
    )
}
