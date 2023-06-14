const formattedDate = (date) => {
  const mongodbDate = new Date(date); // assume this is the MongoDB date
  const convertedDate = mongodbDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // convertedDate should be "3/8/2022"
  return convertedDate;
};

export default formattedDate;
