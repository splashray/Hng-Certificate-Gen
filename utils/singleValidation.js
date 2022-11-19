const isValidInput = (data) => {
  const keys = ['name', 'organization', 'award', 'date', 'certificate_number'];

  // check to see if the user inputed all of these keys

  return keys.every((key) => Object.keys(data).includes(key));
};

module.exports = { isValidInput };
