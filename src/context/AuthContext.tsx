import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  user: any | null
  favorites: any[]
  toggleFavorite: (movie: any) => void
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("movieFavorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
      }
    }
  }, [])

  const toggleFavorite = (movie: any) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === movie.id)

      let newFavorites
      if (exists) {
        newFavorites = prevFavorites.filter((fav) => fav.id !== movie.id)
      } else {
        newFavorites = [...prevFavorites, movie]
      }

      localStorage.setItem("movieFavorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const login = (username: string, password: string) => {
    setUser({ username })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, favorites, toggleFavorite, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
