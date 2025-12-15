"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/UserProvider";

export default function HomePage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (role === "superadmin") {
      router.push("/dashboard");
    } else if (role === "admin") {
      router.push("/tienda");
    } else if (role === "empleado") {
      router.push("/mis-horarios");
    }
  }, [user, role, loading, router]);

  return <p>Cargando...</p>;
}
