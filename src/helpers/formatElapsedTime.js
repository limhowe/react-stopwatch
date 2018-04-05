const DEFAULT_STRING = '00:00:00';

const calculator = (millis, unit) => {
  let value = Math.floor(millis / unit);
  var remainder = millis - value * unit;
  return {
    value,
    remainder
  };
}

const formatHelper = (value, suffix = ':') => {
  let prefix = value < 10 ? '0' : '';
  return  prefix + value + suffix;
}

export const formatElapsedTime = (elapsed) => {
  if (isNaN(elapsed)) return DEFAULT_STRING;
  let result = '';
  let { value, remainder } = calculator(elapsed, 3600000);
  if (value > 0) result += formatHelper(value);
  ({ value, remainder } = calculator(remainder, 60000));
  result += formatHelper(value);
  ({ value,  remainder } = calculator(remainder, 1000));
  result += formatHelper(value, '.');
  ({ value,  remainder } = calculator(remainder, 10));
  result += formatHelper(value, '');

  return result; 
}