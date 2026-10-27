
import getTyreControlPanelPrice from "./tyreControlPanels.js";

const getControlPanelPrice = (applicationSlug, selectedMachinery = []) => {
  switch (String(applicationSlug || "").toLowerCase()) {
    case "tyre":
    case "tyres":
      return getTyreControlPanelPrice(selectedMachinery);

    default:
      return null;
  }
};

export default getControlPanelPrice;
