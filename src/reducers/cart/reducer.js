import { ADD_TO_CART, CHANGE_PRODUCT_AMOUNT_IN_CART, CLEAN_CART, REMOVE_FROM_CART } from "./types";

export const initialStateCart = {
  products: []
};

const byId = targetItem => {
  return item => item.id === targetItem.id;
};

const getExistListItemIndex = (list, targetItem) => list.findIndex(byId(targetItem));

const productReducer = (state = undefined, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let amount;

      if (state) {
        if (action.amount) {
          amount = state.amount + action.amount;
        } else {
          amount = state.amount + 1;
        }
      } else {
        if (action.amount) {
          amount = action.amount;
        } else {
          amount = 1;
        }
      }

      return {
        ...action.product,
        amount
      };


    case CHANGE_PRODUCT_AMOUNT_IN_CART:
      return {
        ...state,
        amount: action.amount || 0
      };


    default:
      return state;
  }
};


const cartReducer = (state = initialStateCart, action) => {
  let existProductIndex;
  let isNotExistProduct;

  if (state.products.length && action.product) {
    existProductIndex = getExistListItemIndex(state.products, action.product);
    isNotExistProduct = existProductIndex === -1;
  }

  switch (action.type) {
    case ADD_TO_CART: {
      if (isNotExistProduct) {

        return {
          products: [
            ...state.products,
            productReducer(undefined, action)
          ]
        };
      }

      const product = state.products[existProductIndex];

      return {
        products: [
          ...state.products.slice(0, existProductIndex),
          productReducer(product, action),
          ...state.products.slice(existProductIndex + 1)
        ]
      };
    }

    case REMOVE_FROM_CART:
      if (isNotExistProduct) {
        return state;
      }

      return {
        products: [
          ...state.products.slice(0, existProductIndex),
          ...state.products.slice(existProductIndex + 1)
        ]
      };

    case CHANGE_PRODUCT_AMOUNT_IN_CART:
      if (isNotExistProduct) {
        return state;
      }

      return {
        products: [
          ...state.products.slice(0, existProductIndex),
          productReducer(state.products[existProductIndex], action),
          ...state.products.slice(existProductIndex + 1)
        ]
      };

    case CLEAN_CART:
      return { ...initialStateCart };

    default:
      return state;
  }
};

export default cartReducer;