// Add your code here
const calculateAge = function (birthDate) {
  const today = new Date("2026-05-18");
  const date = new Date(birthDate);

  if (isNaN(date.getTime())) {
    return "Error: Invalid date format";
  }

  if (date > today) {
    return "Error: Birth date cannot be in the future";
  }

  let age = today.getFullYear() - date.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  if (age > 125) {
    return "Are you sure you are more than 125 years old?";
  }

  return `You are ${age} years old`;
};

console.log(calculateAge("2000-07-01"));
// You are 25 years old
console.log(calculateAge("1988-05-18"));
// You are 38 years old
console.log(calculateAge("2190-01-01"));
// Error: Birth date cannot be in the future
console.log(calculateAge("1800-01-01"));
// Are you sure you are more than 125 years old?
console.log(calculateAge("invalid-date"));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
