export default (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoggedIn: action.isLoggedIn
      };
    case "LOGOUT":
      return {
        isLoggedIn: false
      };
    default:
      return state;
  }
};
