export const checkPassword = (password) => {
  const minPasswordCharacters = 6;
  return password.length >= minPasswordCharacters;
};

export const checkEmail = (email) => {
  const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.match(validEmail);
};

export const checkName = (name) => {
  const minNameCharacters = 11;
  return name.length > minNameCharacters;
};
