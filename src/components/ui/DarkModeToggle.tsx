import { Moon, Sun } from 'lucide-react'
import { useDarkMode } from '../../hooks/useDarkMode'
import { Button } from './Button'

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="p-2"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  )
}
