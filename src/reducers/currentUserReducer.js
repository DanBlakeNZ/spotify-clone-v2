const initialState = {
  displayName: "Dan"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_DETAILS":
      return {
        type: action.type,
        country: action.country,
        display_name: action.displayName,
        email: action.email,
        href: action.href,
        id: action.id,
        images: action.images,
        product: action.product,
        uri: action.uri
      };
    default:
      return state;
  }
};
