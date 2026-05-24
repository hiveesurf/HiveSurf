import { HIVE_LOGO_ALT, HIVE_LOGO_DARK_SRC, HIVE_LOGO_LIGHT_SRC } from '../lib/brandAssets'

const variantSrc = {
  light: HIVE_LOGO_LIGHT_SRC,
  dark: HIVE_LOGO_DARK_SRC,
}

const HiveLogo = ({ variant = 'light', className = '' }) => (
  <img
    src={variantSrc[variant] || HIVE_LOGO_LIGHT_SRC}
    alt={HIVE_LOGO_ALT}
    className={`block leading-none ${className}`.trim()}
    draggable={false}
  />
)

export default HiveLogo
