import { createContext, useState, useContext, useEffect } from "react";
import type { MovieResult } from "../services/api";

export interface MovieContextValue {
  favorites: MovieResult[];
  addToFavorites: (movie: MovieResult) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextValue | undefined>(undefined);

export const useMovieContext = (): MovieContextValue => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }

  return context;
};

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<MovieResult[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs) as MovieResult[]);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: MovieResult) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: MovieContextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
