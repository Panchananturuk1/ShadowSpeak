import { useEffect } from 'react'
import { usePlatformStore } from '@/store/usePlatformStore'

export function usePlatformBootstrap() {
  const bootstrapped = usePlatformStore((state) => state.bootstrapped)
  const bootstrap = usePlatformStore((state) => state.bootstrap)

  useEffect(() => {
    if (!bootstrapped) {
      bootstrap()
    }
  }, [bootstrapped, bootstrap])
}
