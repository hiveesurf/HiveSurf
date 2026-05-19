import { Link } from 'react-router-dom'
import { hiveContactHref } from '../lib/leadActions'

/**
 * Client-side link to /contact — avoids full-page reload (fixes GitHub Pages /contact routing).
 */
const HiveContactLink = ({ intent = 'meeting', source = 'website', className, children, ...rest }) => (
  <Link to={hiveContactHref({ intent, source })} className={className} {...rest}>
    {children}
  </Link>
)

export default HiveContactLink
