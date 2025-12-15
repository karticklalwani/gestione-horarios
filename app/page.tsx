"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";

export default function HomePage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // 🔐 Sin sesión → login
    if (!user) {
      router.replace("/login");
      return;
    }

    // 🔁 Con sesión → según rol
    if (role === "superadmin") {
      router.replace("/dashboard");
    } else if (role === "admin") {
      router.replace("/tienda");
    } else if (role === "empleado") {
      router.replace("/mis-horarios");
    } else {
      // fallback de seguridad
      router.replace("/login");
    }
  }, [user, role, loading, router]);

  return (
    <main style={{ padding: 24 }}>
      <p>Cargando...</p>
    </main>
  );
}
