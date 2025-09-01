// useFavorites.tsx
import React, { createContext, useContext, useState } from "react";

export type Favorite = {
  name: string;
  image: string; 
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (fav: Favorite) => void;
  removeFavorite: (name: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addFavorite = (fav: Favorite) => {
    setFavorites((prev) => {
      if (!prev.find((f) => f.name === fav.name)) {
        return [...prev, fav];
      }
      return prev;
    });
  };

  const removeFavorite = (name: string) => {
    setFavorites((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return context;
};
