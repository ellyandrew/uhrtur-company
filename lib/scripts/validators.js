function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPersonName(name) {
  const trimmed = name.trim();

  // Letters + spaces only
  if (!/^[A-Za-z\s]+$/.test(trimmed)) return false;

  const words = trimmed.split(/\s+/);

  // Must be at least 2 words
  if (words.length < 2) return false;

  // Each word must be at least 2 letters
  return words.every(word => word.length >= 2);
}

function isValidSchoolName(name) {
  const trimmed = name.trim();

  // Letters + spaces only
  if (!/^[A-Za-z\s]+$/.test(trimmed)) return false;

  const words = trimmed.split(/\s+/);

  // At least 2 words
  if (words.length < 2) return false;

  // Reasonable total length
  return trimmed.length >= 6;
}

export function isValidSignupPassword(password) {
  if (!password) return false;

  if (password.length < 8) return false;
  if (/\s/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
}

export function isValidLoginPassword(password) {
  return !!password && password.trim().length > 0;
}

export { isValidEmail, isValidPersonName, isValidSchoolName, isValidSignupPassword, isValidLoginPassword };