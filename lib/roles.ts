import { supabase } from "./supabaseClient";

export type Rol = "superadmin" | "admin" | "empleado" | "invitado";

// Emails de superadmins por defecto
export const SUPERADMINS = [
  "tradinguniverse@hotmail.com",
  "karticklalwani@hotmail.com",
  "kartikzzler@hotmail.com"
];

// -------------------------
// 🔵 Verificar rol en Supabase
// -------------------------
export async function getUserRole(email: string): Promise<Rol> {
  // 1. Superadmin absoluto en frontend (seguridad doble)
  if (SUPERADMINS.includes(email)) return "superadmin";

  // 2. Consultar base de datos supabase
  const { data, error } = await supabase
    .from("usuarios")
    .select("rol")
    .eq("email", email)
    .single();

  if (error || !data) return "invitado";

  return data.rol as Rol;
}

// Helpers
export const esSuperAdmin = (rol: Rol) => rol === "superadmin";
export const esAdmin = (rol: Rol) => rol === "admin";
export const esEmpleado = (rol: Rol) => rol === "empleado";
