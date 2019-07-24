export const login = (accessToken, refreshToken, isLoggedIn) => ({
  type: "LOGIN",
  accessToken,
  refreshToken,
  isLoggedIn
});

export const logout = () => ({
  type: "LOGOUT"
});
