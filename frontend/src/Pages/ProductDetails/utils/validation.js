// =========================================================
// BUSINESS EMAIL VALIDATION
// =========================================================

export const validateBusinessEmail = (email) => {
  const value = email.trim().toLowerCase();

  if (!value) {
    return "Email address is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(value)) {
    return "Please enter a valid email address.";
  }

  const blockedDomains = [
    "gmail.com",
    "yahoo.com",
    "yahoo.co.in",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "aol.com",
    "icloud.com",
    "proton.me",
    "protonmail.com",
  ];

  const domain = value.split("@")[1];

  if (blockedDomains.includes(domain)) {
    return "Please use your business email address.";
  }

  return "";
};

// =========================================================
// INDIAN PHONE VALIDATION
// =========================================================

export const validatePhone = (phone) => {
  const value = phone.replace(/[\s-]/g, "");

  if (!value) {
    return "Phone number is required.";
  }

  const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;

  if (!phoneRegex.test(value)) {
    return "Please enter a valid Indian mobile number.";
  }

  return "";
};