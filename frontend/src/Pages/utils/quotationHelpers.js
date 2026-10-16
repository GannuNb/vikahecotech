
export const normalizeCategoryName = (name = "") =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const getMachineryGroup = (categoryName = "") => {
  const normalized = normalizeCategoryName(categoryName);

  if (normalized.includes("primary shredder")) {
    return "Primary Shredder";
  }

  if (normalized.includes("secondary shredder")) {
    return "Secondary Shredder";
  }

  if (normalized.includes("steel cleaning")) {
    return "Steel Cleaning";
  }

  return categoryName || "Other Equipment";
};

export const getGroupDescription = (groupName = "") => {
  const descriptions = {
    "Primary Shredder":
      "Select the primary shredding capacity required for your plant.",
    "Secondary Shredder":
      "Choose additional shredding equipment if required.",
    "Steel Cleaning":
      "Select the steel cleaning capacity required for your application.",
  };

  return descriptions[groupName] || "";
};

export const getSelectedCount = (configuration = {}) =>
  Object.values(configuration).filter((item) => item?.selected).length;

export const getOptionalEquipmentCount = (selectedEquipment = {}) =>
  Object.values(selectedEquipment).filter((item) => item?.selected).length;

export const getApplicationLabel = (applications = [], applicationId = "") =>
  applications.find((item) => item._id === applicationId)?.name || "";
