export const toCapitalize = (str) => {
  const newString = str.slice(0, 1).toUpperCase() + str.slice(1);
  return newString;
};
