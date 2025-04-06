import React from "react";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const categoryPageData = async (categoryID) => {
  const token=localStorage.getItem("token");
  try {
    let result = [];
    // console.log("cat api", categories.CATEGORIES_PAGE_DATA);
    const allCategories = await apiConnector(
      "POST",
      categories.CATEGORIES_PAGE_DATA,
      { categoryId: categoryID },
      `Bearer ${token}`
    );
    // console.log("lvl 1");
    if (!allCategories?.data?.success) {
      throw new Error("could not fetc category page data");
    }
    result = allCategories?.data;
    // console.log("result", result);
    return result;
  } catch (e) {
    throw new Error("error while fetching category page deatail");
  }
};

export default categoryPageData;
