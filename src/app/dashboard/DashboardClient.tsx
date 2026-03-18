'use client'

import { useState } from 'react'
import { StudentForm } from '@/components/StudentForm'
import { StudentTable } from '@/components/StudentTable'
import { type Alumno } from '@/app/actions/alumnos'

export function DashboardClient({ initialAlumnos }: { initialAlumnos: Alumno[] }) {
    const [alumnoEdit, setAlumnoEdit] = useState<Alumno | null>(null)

    return (
        <>
            <StudentForm
                alumnoEdit={alumnoEdit}
                onClearEdit={() => setAlumnoEdit(null)}
            />
            <StudentTable
                alumnos={initialAlumnos}
                onEdit={(alumno) => setAlumnoEdit(alumno)}
            />
        </>
    )
}
