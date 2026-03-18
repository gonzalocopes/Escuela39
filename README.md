# Sistema de Gestión de Alumnos

Esta es una aplicación web tipo "mini SaaS" diseñada para administrar alumnos. Está construida con **Next.js 14**, **TailwindCSS** y **Supabase**, y está optimizada para ser desplegada en **Vercel**.

## 🚀 Requisitos Previos

1. [Node.js](https://nodejs.org/) instalado.
2. Cuenta en [Supabase](https://supabase.com/).
3. Cuenta en [Vercel](https://vercel.com/) (para hacer el despliegue).

## 🛠 Instalación y Ejecución Local

1. Instala las dependencias si no lo has hecho:
   ```bash
   npm install
   ```

2. Configura las variables de entorno. Renombra o edita el archivo `.env.local` en la raíz del proyecto y agrega las credenciales de tu proyecto de Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 🗄 Configuración de Supabase

Para que la aplicación funcione, necesitas crear el backend (Base de datos y Autenticación) en tu proyecto de Supabase.

### 1. Activar Autenticación
1. Ve a **Authentication** en el panel de Supabase.
2. Asegúrate de que los proveedores por Email estén activados.
3. Ve a **Usuarios** y crea un nuevo usuario con correo (ej. `admin@admin.com`) y una contraseña. Este será el administrador para ingresar al sistema.

### 2. Configurar Base de Datos
Ve al **SQL Editor** en Supabase, crea una **New query** (Nueva consulta), pega el siguiente código y presiona **Run**:

```sql
-- Crear tabla "alumnos"
create table public.alumnos (
    id uuid primary key default uuid_generate_v4(),
    nombre_completo text not null,
    dni text not null unique,
    anio_ingreso integer not null,
    anio_egreso integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas de seguridad RLS (Row Level Security)
alter table public.alumnos enable row level security;

-- Como es una app privada, permitimos acceso total SOLO a usuarios autenticados
create policy "Acceso total para usuarios autenticados" 
  on public.alumnos for all 
  to authenticated 
  using (true)
  with check (true);
```

---

## 🌍 Despliegue en Vercel

1. Sube este proyecto a un repositorio en **GitHub**, **GitLab** o **Bitbucket**.
2. Entra a [Vercel](https://vercel.com/) y haz clic en **Add New -> Project**.
3. Importa tu repositorio recién creado.
4. En el apartado de **Environment Variables (Variables de entorno)**, asegúrate de añadir:
   - `NEXT_PUBLIC_SUPABASE_URL`: (El valor de tu URL de Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (El valor de tu Anon Key de Supabase)
5. Haz clic en **Deploy**.

¡Vercel construirá y desplegará tu aplicación web automáticamente!

---

## 💻 Características
- **Autenticación Segura**: Uso de `@supabase/ssr` con cookies HTTP-only para validar el acceso al panel admin.
- **Validaciones**: El campo DNI está definido como `unique` a nivel de base de datos, garantizando que no se puedan duplicar registros.
- **Server Actions**: Todo el CRUD de usuarios no usa rutas API tradicionales (endpoints), sino Server Actions directamente integrados en Next.js.
- **Buscador Reactivo**: Al escribir, la búsqueda se actualiza en el servidor limpiamente y sin recargar la página.
