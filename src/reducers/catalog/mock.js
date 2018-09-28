export const fetchProductsParams = {
  params: {
    q: "man in black"
  }
};

export const fetchProductsData = {
  products: [
    { id: 1, title: "book 1" },
    { id: 2, title: "book 2" },
    { id: 3, title: "book 3" }
  ],
  totalItems: 100
};

export const fetchProductsDataPage2 = {
  products: [

    { id: 4, title: "book 4" },
    { id: 5, title: "book 5" },
    { id: 6, title: "book 6" }
  ],
  totalItems: 200
};

export const saveProductData = {
  title: "book 1", amount: 1
};

export const errorMessage = "fail request";

export default {
  fetchProductsParams,
  saveProductData,
  errorMessage
};