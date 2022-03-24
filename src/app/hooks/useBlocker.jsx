import { useContext, useEffect } from 'react'
import { UNSAFE_NavigationContext } from 'react-router-dom'

export function useBlocker(blocker, when) {
  const navigator = useContext(UNSAFE_NavigationContext).navigator
  useEffect(() => {
    if (!when) return

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock()
          tx.retry()
        },
      }

      blocker(autoUnblockingTx)
    })
    return unblock
  }, [navigator, blocker, when])
}
