export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoggedIn: action.isLoggedIn
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
