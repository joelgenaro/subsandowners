import categories from "./categories";

const services = categories.map((category) => ({
  label: category.name,
  options: category.subcategories.map((subcategory) => ({
    label: subcategory,
    value: `${category.name}|${subcategory}`,
  })),
}));

export default services;
