export const upperCaseString = (string = '') => string.toUpperCase();

export const lowerCaseString = (string = '') => string.toLowerCase();

export const capitalizeString = (string = '') =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

export const thousandSeparator = (number = 0) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
