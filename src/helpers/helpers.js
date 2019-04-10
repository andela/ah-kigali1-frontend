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

const isAlphanumeric = value => {
  const alphanumericRegex = /^[a-z0-9]+$/i;
  return alphanumericRegex.test(value);
};
export const verifyPassword = password => {
  const isPassword = isAlphanumeric(password) && password.trim().length >= 8;
  if (!isPassword) {
    return "The password should be an alphanumeric with at least 8 characters";
  }
  return "";
};
