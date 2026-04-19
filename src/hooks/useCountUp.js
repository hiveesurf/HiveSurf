import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - (1 - t) ** 3

const useCountUp = (target = 0, duration = 2000, enabled = true) => {
  const [value, setValue] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }

    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(target * easeOutCubic(progress)))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => frameRef.current && cancelAnimationFrame(frameRef.current)
  }, [target, duration, enabled])

  return value
}

export default useCountUp
