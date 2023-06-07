// Capitalize first letter of text/string
const capitalize = (str) => {
  if (str == null) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;
