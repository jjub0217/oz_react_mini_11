export const localStorageUtils = () => {
  const getItemFromLocalStorage = (itemKey) => {
    const strItem = localStorage.getItem(itemKey);
    return JSON.parse(strItem);
  };

  const setItemToLocalStorage = (itemKey, item) => {
    const strItem = JSON.stringify(item);
    localStorage.setItem(itemKey, strItem);
  };
  const removeItemFromLocalStorage = (itemKey) => {
    localStorage.removeItem(itemKey);
  };

  return {
    getItemFromLocalStorage,
    setItemToLocalStorage,
    removeItemFromLocalStorage,
  };
};
