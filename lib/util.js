export const formatCurrency = (amount) => {
  return "₹" + amount.toLocaleString("en-IN");
};

export const generateOrderId = () => {
  return "ORD-" + Math.floor(Math.random() * 1000000);
};
