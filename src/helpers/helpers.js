export const fieldRemover = loggedInUser => {
  const filteredUserObject = {};
  const removeFields = ["id", "password", "roleId", "createdAt", "updatedAt"];
  Object.keys(loggedInUser).forEach(key => {
    if (loggedInUser[key] && removeFields.indexOf(key) === -1) {
      filteredUserObject[key] = loggedInUser[key];
    }
  });
  return filteredUserObject;
};

export const nullRemover = loggedInUser => {
  Object.keys(loggedInUser).forEach(key => {
    if (loggedInUser[key] === null) {
      loggedInUser[key] = "";
    }
  });
  return loggedInUser;
};
