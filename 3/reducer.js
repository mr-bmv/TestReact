const initialState = {
    products: [],
  };
  
  export default function basketReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD_PRODUCT_TO_BASKET":
        return state;
      case "REMOVE_PRODUCT_FROM_BASKET":
        return state;
      default:
        return state;
    }
  }
  