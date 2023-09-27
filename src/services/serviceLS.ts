export function setItemToLS(key: string, item: string) {
  localStorage.setItem(key, item);
}

export function getItemFromLS(key: string) {
  return localStorage.getItem(key);
}
