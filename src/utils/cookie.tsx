export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}; path=/;`;
}

export function removeCookie(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
