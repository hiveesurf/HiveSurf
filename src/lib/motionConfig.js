export const entranceEase = [0.25, 0.46, 0.45, 0.94]

export const springSoft = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

export const springFirm = {
  type: 'spring',
  stiffness: 320,
  damping: 26,
}

export const inViewConfig = {
  once: true,
  margin: '-100px',
}

export const fadeUp = (delay = 0, distance = 40) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: entranceEase, delay },
})
