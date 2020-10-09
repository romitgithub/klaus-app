export const getUserRoleName = (userRole: string) => {
  if (userRole) {
    return userRole.split("_").join(" ").toLowerCase();
  }
};
