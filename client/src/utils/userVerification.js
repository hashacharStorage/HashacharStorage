import Cookies from "js-cookie";

export function isUserLoggedIn() {
  const userId = Cookies.get("id");
  console.log(userId)
  return userId !== undefined;
}

export function isUserAdmin() {
  const userCompany = Cookies.get("company");
  return userCompany == "0";
}

export function handleUserRedirect() {
  if (isUserLoggedIn()) {
    if (isUserAdmin()) {
      return "/admin/home";
    } else {
      return "/home";
    }
  } else {
    return "/login";
  }
}
