/** Prefix hash links with `/` when not on the homepage so nav works from /contact, /marketing, etc. */
export function resolveEnterpriseNavHref(href, pathname) {
  if (href.startsWith('#') && pathname !== '/') {
    return `/${href}`
  }
  return href
}

export function isInternalNavHref(href) {
  return href.startsWith('/')
}
