export const loginAction = authDetails => ({
  type: "LOGIN",
  ...authDetails
});

export const logoutAction = () => ({
  type: "LOGOUT"
});
