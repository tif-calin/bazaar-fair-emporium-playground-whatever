const RADIANS_PER_DEGREE = Math.PI / 180;
const EARTH_RADIUS_IN_KILOMETERS = 6_371;
const EARTH_RADIUS_IN_METERS = EARTH_RADIUS_IN_KILOMETERS * 1_000;

/**
 * Haversine formula for calculating the great-circle distance between two points on a sphere. The
 * assumption that earth is a perfect sphere results in an error of up to 0.5%.
 *
 * See also: Vincenty's, Lambert,
 */
export const haversine = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const latDistance = (lat1 - lat2) * RADIANS_PER_DEGREE;
  const lngDistance = (lng1 - lng2) * RADIANS_PER_DEGREE;

  const a =
    Math.sin(latDistance / 2) ** 2 +
    Math.cos(lat1 * RADIANS_PER_DEGREE) *
      Math.cos(lat2 * RADIANS_PER_DEGREE) *
      Math.sin(lngDistance / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_IN_METERS * c;
};

/**
 * A simpler pythagorean formula for calculating distance between two coordinates. Very much
 * incorrect except for small distances. Assumes the earth is flat.
 */
export const pythagorean = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  // Latitude varies from 110,574 at the equator to 111,699 at the poles.
  // So we will take the average latitude and use that to guesstimate the meters per degree.
  const metersPerDegree = (Math.abs(lat2 - lat1) / 90) * (111_699 - 110_574) + 110_574;

  // return Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2) * metersPerDegree;

  let a = (lat2 - lat1) * metersPerDegree;
  let b = (lng2 - lng1) * metersPerDegree * Math.cos((lat1 + lat2) / 2);

  return Math.sqrt(a ** 2 + b ** 2);
};
