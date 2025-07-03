// components/FavoriteButton.jsx
"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function FavoriteButton({ itemId, itemType }) {
  const { user, userInfo } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && userInfo?.rol === "usuario") {
      checkFavorite();
    }
  }, [user, userInfo]);

  async function checkFavorite() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("item_id", itemId)
        .eq("item_type", itemType)
        .single();

      if (data) setIsFavorite(true);
      if (error) console.error("❌ Error verificando favorito:", error);
    } catch (err) {
      console.error("❌ Error al verificar favorito:", err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite(e) {
    e.stopPropagation();
    if (!user) return toast.error("Inicia sesión para guardar favoritos");

    setHeartAnimation(true);
    setTimeout(() => setHeartAnimation(false), 400);

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId)
        .eq("item_type", itemType);

      if (!error) {
        setIsFavorite(false);
        toast.success("Eliminado de favoritos");
      } else {
        toast.error("Error al eliminar favorito");
      }
    } else {
      const { error } = await supabase.from("favorites").insert([
        {
          user_id: user.id,
          item_id: itemId,
          item_type: itemType, // 'car' o 'property'
        },
      ]);

      if (!error) {
        setIsFavorite(true);
        toast.success("Agregado a favoritos");
      } else {
        toast.error("Error al agregar favorito");
      }
    }
  }

  if (!user || userInfo?.rol !== "usuario" || loading) return null;

  return (
    <button
      onClick={toggleFavorite}
      aria-label="Favorito"
      className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center bg-[var(--navbackground)] rounded-full shadow transition-colors heart-hover"
    >
      {isFavorite ? (
        <FaHeart
          className={`text-[var(--btn-primary)] transition-all duration-200 ${
            heartAnimation ? "heart-animate" : ""
          }`}
        />
      ) : (
        <FaRegHeart
          className={`text-[var(--heart-button)] transition-all duration-200 hover:text-[var(--btn-primary)] ${
            heartAnimation ? "heart-animate" : ""
          }`}
        />
      )}
    </button>
  );
}
