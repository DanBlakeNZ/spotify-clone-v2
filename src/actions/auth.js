export const login = authDetails => ({
  type: "LOGIN",
  ...authDetails
});

export const logout = () => ({
  type: "LOGOUT"
});
