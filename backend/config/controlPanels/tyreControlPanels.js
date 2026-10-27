
const LOW_CAPACITY_PRICE = 800000;
const HIGH_CAPACITY_PRICE = 1800000;

const getCapacityValue = (capacityName) => {
  const match = String(capacityName ?? "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const getTyreControlPanelPrice = (selectedMachinery = []) => {
  let highestCapacity = 0;
  for (const item of selectedMachinery) {
    const capacityName = item.quotationModel?.capacityName || item.capacityName;
    const capacity = getCapacityValue(capacityName);
    if (capacity !== null) {
      highestCapacity = Math.max(highestCapacity, capacity);
    }
  }
  const price = highestCapacity > 4 ? HIGH_CAPACITY_PRICE : LOW_CAPACITY_PRICE;
  return {
    name: "Control Panel",
    quantity: 1,
    unitPrice: price,
    totalPrice: price,
    highestCapacity,
  };
};

export default getTyreControlPanelPrice;
