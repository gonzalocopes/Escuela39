'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export type Alumno = {
    id: string
    nombre_completo: string
    dni: string
    anio_ingreso: number
    anio_egreso: number
    created_at: string
}

export async function getAlumnos(search?: string) {
    const supabase = createClient()

    let query = supabase
        .from('alumnos')
        .select('*')
        .order('created_at', { ascending: false })

    if (search) {
        query = query.ilike('dni', `%${search}%`)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching alumnos:', error)
        return []
    }

    return data as Alumno[]
}

export async function createAlumno(formData: FormData) {
    const supabase = createClient()

    const data = {
        nombre_completo: formData.get('nombre_completo') as string,
        dni: formData.get('dni') as string,
        anio_ingreso: parseInt(formData.get('anio_ingreso') as string, 10),
        anio_egreso: parseInt(formData.get('anio_egreso') as string, 10),
    }

    const { error } = await supabase
        .from('alumnos')
        .insert([data])

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function updateAlumno(id: string, formData: FormData) {
    const supabase = createClient()

    const data = {
        nombre_completo: formData.get('nombre_completo') as string,
        dni: formData.get('dni') as string,
        anio_ingreso: parseInt(formData.get('anio_ingreso') as string, 10),
        anio_egreso: parseInt(formData.get('anio_egreso') as string, 10),
    }

    const { error } = await supabase
        .from('alumnos')
        .update(data)
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function deleteAlumno(id: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from('alumnos')
        .delete()
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
