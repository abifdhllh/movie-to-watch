export const upperCaseString = (string = '') => string.toUpperCase();

export const lowerCaseString = (string = '') => string.toLowerCase();

export const capitalizeString = (string = '') =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : '';

export const thousandSeparator = (number = 0) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getImageApi = (path: string, width = 'w300') =>
  path ? {uri: `https://image.tmdb.org/t/p/${width}${path}`} : '';

export const round = (value: number, precision = 1) => {
  if (value) {
    if (value % 1 === 0) {
      return `${value}.0`;
    }
    var multiplier = Math.pow(10, precision || 0);
    const final = Math.round(value * multiplier) / multiplier;
    return final % 1 === 0 ? `${final}.0` : final.toString();
  }
  return '0';
};

export const cutText = (val: string, cutLength: number) =>
  val
    ? val?.length > cutLength
      ? val.substring(0, cutLength) + '...'
      : val
    : '';

export const timeConvert = (val: number) => {
  var num = val;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return `${rhours ? rhours + ' hr ' : ''}${rminutes} min`;
};

export function getAge(dateString: string) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age} years`;
}

export function calculateTVShowSeasonsAndEpisodes(
  tvShowSeasons: {episode_count: number}[],
) {
  const seasons = tvShowSeasons?.length;
  const episodes = tvShowSeasons?.reduce(
    (prevVal, currentVal) => prevVal + currentVal.episode_count,
    0,
  );

  return `${seasons} Season(s) & ${episodes} Episode(s)`;
}
