import { app } from "./../realmConfig";
const user = app.currentUser;

export function isUser() {
  if (isNormalUser() || isServerUser()) return true;
  return false;
}
export function isNormalUser() {
  if (user && user._profile.type === "normal") return true;
  return false;
}
export function isServerUser() {
  if (user && user._profile.type === "server") return true;
  return false;
}
export function isAdmin() {
  if (
    user &&
    user._profile.type === "normal" &&
    user.customData &&
    user.customData.isAdmin === true
  )
    return true;
  return false;
}
