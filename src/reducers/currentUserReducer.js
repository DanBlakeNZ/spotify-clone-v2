const initialState = {
  country: null,
  displayName: null,
  email: null,
  externalUrls: null,
  followers: null,
  href: null,
  id: null,
  images: null,
  product: null,
  type: null,
  uri: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER_DETAILS":
      return {
        country: action.country,
        displayName: action.displayName,
        email: action.email,
        externalUrls: action.externalUrls,
        followers: action.followers,
        href: action.href,
        id: action.id,
        images: action.images,
        product: action.product,
        userType: action.type,
        uri: action.uri
      };
    default:
      return state;
  }
};
