import categories from "./categories";

const convertServiceLabelToValue = (label) => {
  let categoryName = null;

  categories.forEach((category) => {
    if (category.subcategories.includes(label)) {
      categoryName = category.name;
    }
  });

  return {
    label: label,
    value: `${categoryName}|${label}`,
  };
};

export default convertServiceLabelToValue;
