export const URI = `/api`
export const redirectUri = (parent: string) => (param?: string) => `${URI}/${parent}${param ? `/${param}` : ''}`
