import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAdminShortcut() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+A to access admin login
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        router.push('/admin/login')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router])
}