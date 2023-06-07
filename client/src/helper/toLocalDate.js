// Calculate time from date posted to current date
const toLocalDate = (createdAt) => {
  let toString = new Date(createdAt);
  toString = toString.toString().split(" ");

  const date = toString[1] + " " + toString[2] + " " + toString[3];

  return date;
};

export { toLocalDate };
