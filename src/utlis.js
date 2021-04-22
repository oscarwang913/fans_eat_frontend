const TOKEN = "token";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN);
};

export const validateData = (values) => {
  const { fullName, userName, email, password } = values;
  const regexForFullName = /^[\W\w\s]{3,20}$/;
  const regexForUserName = /^[\W\w\s]{3,20}$/;
  const regexForEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const regexForPassword = /^[\w\s\S]{6,20}$/;

  let errors = {};

  if (!regexForFullName.test(fullName)) {
    errors.fullName = true;
  } else {
    errors.fullName = false;
  }

  if (!regexForUserName.test(userName)) {
    errors.userName = true;
  } else {
    errors.userName = false;
  }

  if (!regexForEmail.test(email)) {
    errors.email = true;
  } else {
    errors.email = false;
  }

  if (!regexForPassword.test(password)) {
    errors.password = true;
  } else {
    errors.password = false;
  }

  let errorStatus = Object.values(errors);

  return errorStatus;
};

// convert time to yyyy-mm-dd format
export const timeConvert = (str) => {
  return str.split("T")[0];
};
