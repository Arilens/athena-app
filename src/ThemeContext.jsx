import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(true)

  const toggleModo = () => setModoEscuro(prev => !prev)

  const tema = {
    modoEscuro,
    toggleModo,
    bg: modoEscuro ? '#0d0d0d' : '#f5f5f5',
    surface: modoEscuro ? '#1a1a1a' : '#ffffff',
    surface2: modoEscuro ? '#242424' : '#e8e8e8',
    text: modoEscuro ? '#ffffff' : '#111111',
    textMuted: modoEscuro ? '#888888' : '#555555',
    border: modoEscuro ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    navBg: modoEscuro ? '#161616' : '#ffffff',
    headerBg: modoEscuro ? '#111111' : '#ffffff',
  }

  useEffect(() => {
    document.body.style.background = tema.bg
  }, [modoEscuro])

  return (
    <ThemeContext.Provider value={tema}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTema() {
  return useContext(ThemeContext)
}