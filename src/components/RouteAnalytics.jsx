import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGa4, trackPageView } from '../lib/analytics'

/**
 * Initializes GA4 once, then sends a virtual page_view on every client-side route change.
 */
const RouteAnalytics = () => {
  const location = useLocation()

  useEffect(() => {
    initGa4()
  }, [])

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`
    trackPageView(path || '/')
  }, [location.pathname, location.search, location.hash])

  return null
}

export default RouteAnalytics
