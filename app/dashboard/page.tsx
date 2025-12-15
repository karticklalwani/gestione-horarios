"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";
import { supabase } from "@/lib/supabaseClient";

type Stats = {
  tiendas: number;
  empleados: number;
  ausenciasPendientes: number;
};

export default function SuperadminDashboard() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    // 🔐 No logueado
    if (!user) {
      router.push("/login");
      return;
    }

    // 🚫 No es superadmin
    if (role !== "superadmin") {
      router.push("/");
      return;
    }

    // 📊 Cargar estadísticas
    const loadStats = async () => {
      try {
        const [{ count: tiendas }, { count: empleados }, { count: ausencias }] =
          await Promise.all([
            supabase.from("tiendas").select("*", { count: "exact", head: true }),
            supabase
              .from("empleados")
              .select("*", { count: "exact", head: true }),
            supabase
              .from("ausencias")
              .select("*", {
                count: "exact",
                head: true,
              })
              .eq("estado", "pendiente"),
          ]);

        setStats({
          tiendas: tiendas ?? 0,
          empleados: empleados ?? 0,
          ausenciasPendientes: ausencias ?? 0,
        });
      } catch (err) {
        setError("Error cargando estadísticas");
      }
    };

    loadStats();
  }, [user, role, loading, router]);

  if (loading || !stats) {
    return <p style={{ padding: 24 }}>Cargando dashboard...</p>;
  }

  if (error) {
    return <p style={{ padding: 24, color: "red" }}>{error}</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard Superadmin</h1>
      <p>Bienvenido, {user?.email}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        <div style={cardStyle}>
          <h3>Tiendas</h3>
          <strong>{stats.tiendas}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Empleados</h3>
          <strong>{stats.empleados}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Ausencias pendientes</h3>
          <strong>{stats.ausenciasPendientes}</strong>
        </div>
      </div>
    </main>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 16,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
};
