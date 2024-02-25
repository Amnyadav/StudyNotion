const REACT_APP_BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";
console.log("this is base url ", REACT_APP_BASE_URL);

export const categories = {
  CATEGORIES_API: REACT_APP_BASE_URL + "/showAllCategories",
  CATEGORIES_PAGE_DATA:REACT_APP_BASE_URL+'/categoryPageDetail'
};
console.log("printing in api.js", REACT_APP_BASE_URL);
