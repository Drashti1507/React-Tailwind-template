export const isAuthenticated = () => {
  const token = localStorage.getItem("user_token");
  return !!token; // true if exists
};

export const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_token");
};
