export const checkPermissions = (reqUser, resUserId) => {
  // console.log(reqUser);
  // console.log(resUserId);
  // console.log(typeof resUserId);

  if (reqUser._id === resUserId.toString() || reqUser.role === "admin")
    return true;
};
